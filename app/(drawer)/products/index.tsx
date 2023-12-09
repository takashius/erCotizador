import { Stack, router, useNavigation } from "expo-router";
import { Box, Fab, Icon, Popover, Button } from "native-base";
import { View, TouchableOpacity, Animated } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import CardProductItem from "../../../components/CardProductItem";
import SearchBar from "../../../components/SearchBar";
import { useListProduct, useDeleteProduct } from "../../../api/product";
import Spinner from "../../../components/helpers/Spinner";
import { AntDesign } from "@expo/vector-icons";
import { useOptions } from "../../../components/helpers/OptionsScreens";
import { useTranslation } from "react-i18next";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Product } from "../../../types/products";

export default () => {
  const { t } = useTranslation();
  const responseQuery = useListProduct();
  const deleteMutation = useDeleteProduct();
  const navigation = useNavigation();
  const [open, setIsOpen] = useState<any>({});
  const [dataList, setDataList] = useState<Product[]>();

  useEffect(() => {
    setDataList(responseQuery.data);
  }, [responseQuery.data]);

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
      <Stack.Screen
        options={useOptions(t("modules.product"), false, navigation)}
      />
      <SearchBar />
      {responseQuery.isLoading && <Spinner />}
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
          <TouchableOpacity
            onPress={() => {
              console.log("Entrando");
            }}
          >
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
              <Popover // @ts-ignore
                placement="left top"
                trigger={(triggerProps) => {
                  return (
                    <Button
                      colorScheme="danger"
                      alignSelf="center"
                      {...triggerProps}
                      onPress={() =>
                        setIsOpen({ ...open, [data.index]: !open[data.index] })
                      }
                    >
                      <Icon
                        marginTop={1}
                        as={<FontAwesome name="times-circle" />}
                        size={"2xl"}
                        color={"white"}
                      />
                    </Button>
                  );
                }}
                isOpen={open[data.index]}
                onClose={() => setIsOpen(false)}
              >
                <Popover.Content w="56">
                  <Popover.Arrow />
                  <Popover.CloseButton onPress={() => setIsOpen(false)} />
                  <Popover.Header>Delete Customer</Popover.Header>
                  <Popover.Body>
                    This will remove all data relating to Alex. This action
                    cannot be reversed. Deleted data can not be recovered.
                  </Popover.Body>
                  <Popover.Footer justifyContent="flex-end">
                    <Button.Group space={2}>
                      <Button
                        colorScheme="coolGray"
                        variant="ghost"
                        onPress={() => setIsOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        colorScheme="danger"
                        onPress={() => {
                          setIsOpen(false);
                          deleteRow(rowMap, data?.item._id);
                          deleteMutation.mutate(data.item._id);
                        }}
                      >
                        Delete
                      </Button>
                    </Button.Group>
                  </Popover.Footer>
                </Popover.Content>
              </Popover>
            </View>
          </TouchableOpacity>
        )}
        rightOpenValue={-75}
      />
      {/* <FlatList
        data={responseQuery.data}
        renderItem={({ item }) => <CardProductItem item={item} />}
        keyExtractor={(item) => item._id}
      /> */}
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
