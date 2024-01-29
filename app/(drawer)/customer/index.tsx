import { View, Animated } from "react-native";
import { Stack, router, useNavigation } from "expo-router";
import { Box, Fab, Icon } from "native-base";
import { useIsFocused } from "@react-navigation/native";
import { SwipeListView } from "react-native-swipe-list-view";
import {
  SearchBar,
  CardCustomerItem,
  Spinner,
  useOptions,
  DeleteButton,
  read, remove
} from "../../../components";
import { useListCustomer, useDeleteCustomer } from "../../../api/customer";
import { type Customer } from "../../../types/customer";
import { useEffect, useState } from "react";
import { t } from "i18next";
import { AntDesign } from "@expo/vector-icons";

export default () => {
  const responseQuery = useListCustomer();
  const deleteMutation = useDeleteCustomer();
  const [dataList, setDataList] = useState<Customer[]>();
  const [dataDefault, setDataDefault] = useState<Customer[]>();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    setDataList(responseQuery.data);
    setDataDefault(responseQuery.data);
  }, [responseQuery.data]);

  const isReturnFromForm = async () => {
    const created = await read("mutateCustomer");
    if (created && created === 'true') {
      responseQuery.refetch();
      await remove("mutateCustomer");
    }
  };

  useEffect(() => {
    if (isFocused) {
      isReturnFromForm();
    }
  }, [isFocused]);

  const filterData = (search: string) => {
    if (dataDefault) {
      setDataList(
        dataDefault.filter(
          (item: Customer) =>
            item.lastname.toUpperCase().includes(search.toUpperCase()) ||
            item.name.toUpperCase().includes(search.toUpperCase()) ||
            item.title.toUpperCase().includes(search.toUpperCase())
        )
      );
    }
  };

  const deleteRow = (rowMap: any, rowKey: any) => {
    if (dataList !== undefined) {
      rowMap[rowKey].closeRow();
      const config = {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      };
      Animated.timing(new Animated.Value(50), config).start(() => {
        const newData = [...dataList];
        const prevIndex = dataList.findIndex(
          (item: any) => item._id === rowKey
        );
        newData.splice(prevIndex, 1);
        setDataList(newData);
      });
    }
  };

  return (
    <Box bg="white" safeArea flex="1">
      <Stack.Screen options={useOptions(t("modules.customer"), navigation)} />
      <SearchBar filterData={filterData} />
      {responseQuery.isLoading ? (
        <Spinner />
      ) : (
        <>
          <SwipeListView
            data={dataList}
            useFlatList={true}
            keyExtractor={(item) => item._id!}
            disableRightSwipe={true}
            closeOnRowBeginSwipe={true}
            onRefresh={() => responseQuery.refetch()}
            refreshing={responseQuery.isFetching || deleteMutation.isPending}
            renderItem={({ item }) => <CardCustomerItem item={item} />}
            renderHiddenItem={(data, rowMap) => (
              <View
                style={{
                  marginLeft: 280,
                  height: "90%",
                  width: 60,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <DeleteButton
                  data={data}
                  rowMap={rowMap}
                  deleteMutation={deleteMutation}
                  deleteRow={deleteRow}
                />
              </View>
            )}
            rightOpenValue={-75}
          />
          <Fab
            renderInPortal={false}
            shadow={2}
            backgroundColor={"blue.500"}
            onPress={() => {
              router.push({
                pathname: "/(drawer)/customer/form",
                params: { post: "new" },
              });
            }}
            size="sm"
            icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />}
          />
        </>
      )}
    </Box>
  );
};
