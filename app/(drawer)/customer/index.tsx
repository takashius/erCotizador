import { FlatList } from "react-native";
import { Stack, router, useNavigation } from "expo-router";
import { Box, Fab, Icon } from "native-base";
import {
  SearchBar,
  CardCustomerItem,
  Spinner,
  useOptions,
} from "../../../components";
import { useListCustomer } from "../../../api/customer";
import { type Customer } from "../../../types/customer";
import { useEffect, useState } from "react";
import { t } from "i18next";
import { AntDesign } from "@expo/vector-icons";

export default () => {
  const responseQuery = useListCustomer();
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
      ) : (<>
      <FlatList
          data={dataList}
          renderItem={({ item }) => <CardCustomerItem item={item} />}
          keyExtractor={(item) => item._id!}
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
