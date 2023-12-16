import { FlatList } from "react-native";
import { Stack } from "expo-router";
import { Box } from "native-base";
import SearchBar from "../../../components/SearchBar";
import CardCustomerItem from "../../../components/CardCustomerItem";
import { useListCustomer } from "../../../api/customer";
import Spinner from "../../../components/helpers/Spinner";
import { type Customer } from "../../../types/customer";
import { useEffect, useState } from "react";

export default () => {
  const responseQuery = useListCustomer();
  const [dataList, setDataList] = useState<Customer[]>();
  const [dataDefault, setDataDefault] = useState<Customer[]>();

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
      <Stack.Screen options={{ headerShown: false }} />
      <SearchBar filterData={filterData} />
      {responseQuery.isLoading && <Spinner />}
      <FlatList
        data={responseQuery.data}
        renderItem={({ item }) => <CardCustomerItem item={item} />}
        keyExtractor={(item) => item._id}
      />
    </Box>
  );
};
