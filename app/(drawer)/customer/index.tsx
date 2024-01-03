import { FlatList, View } from "react-native";
import { Stack, router, useNavigation } from "expo-router";
import { Box, Fab, Icon } from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import {
  SearchBar,
  CardCustomerItem,
  Spinner,
  useOptions,
  DeleteButton,
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

  useEffect(() => {
    setDataList(responseQuery.data);
    setDataDefault(responseQuery.data);
  }, [responseQuery.data]);

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
