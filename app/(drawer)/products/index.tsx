import { Stack, router, useNavigation } from "expo-router";
import { Box, Fab, Icon } from "native-base";
import { View, Animated } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { SwipeListView } from "react-native-swipe-list-view";
import {
  CardProductItem,
  SearchBar,
  Spinner,
  useOptions,
  DeleteButton,
  read, remove
} from "../../../components";
import { useListProduct, useDeleteProduct } from "../../../api/product";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Product } from "../../../types/products";
import { t } from "i18next";

export default () => {
  const responseQuery = useListProduct();
  const deleteMutation = useDeleteProduct();
  const navigation = useNavigation();
  const [dataList, setDataList] = useState<Product[]>();
  const [dataDefault, setDataDefault] = useState<Product[]>();
  const isFocused = useIsFocused();

  useEffect(() => {
    setDataList(responseQuery.data);
    setDataDefault(responseQuery.data);
  }, [responseQuery.data]);

  const isReturnFromForm = async () => {
    const created = await read("mutateProduct");
    if (created && created === 'true') {
      responseQuery.refetch();
      await remove("mutateProduct");
    }
  };

  useEffect(() => {
    if (isFocused) {
      isReturnFromForm();
    }
  }, [isFocused]);

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

  const filterData = (search: string) => {
    if (dataDefault) {
      setDataList(
        dataDefault.filter(
          (item: Product) =>
            item.description.toUpperCase().includes(search.toUpperCase()) ||
            item.name.toUpperCase().includes(search.toUpperCase())
        )
      );
    }
  };

  return (
    <Box bg="white" safeArea flex="1">
      <Stack.Screen options={useOptions(t("modules.product"), navigation)} />
      <SearchBar filterData={filterData} />
      {responseQuery.isLoading ? (
        <Spinner />
      ) : (
        <SwipeListView
          data={dataList}
          useFlatList={true}
          keyExtractor={(item) => item._id}
          disableRightSwipe={true}
          closeOnRowBeginSwipe={true}
          onRefresh={() => responseQuery.refetch()}
          refreshing={responseQuery.isFetching || deleteMutation.isPending}
          renderItem={({ item }) => <CardProductItem item={item} />}
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
      )}

      <Fab
        renderInPortal={false}
        shadow={2}
        backgroundColor={"blue.500"}
        onPress={() => {
          router.push({
            pathname: "/(drawer)/products/form",
            params: { post: "new" },
          });
        }}
        size="sm"
        icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />}
      />
    </Box>
  );
};
