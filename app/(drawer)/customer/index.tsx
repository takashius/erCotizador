import { FlatList } from "react-native";
import { Stack } from "expo-router";
import { Box } from "native-base";
import SearchBar from "../../../components/SearchBar";
import CardCustomerItem from "../../../components/CardCustomerItem";
import { useListCustomer } from "../../../components/api/customer";
import Spinner from "../../../components/helpers/Spinner";

export default () => {
  const responseQuery = useListCustomer();

  return (
    <Box bg="white" safeArea flex="1">
      <Stack.Screen options={{ headerShown: false }} />
      <SearchBar />
      {responseQuery.isLoading && <Spinner />}
      <FlatList
        data={responseQuery.data}
        renderItem={({ item }) => <CardCustomerItem item={item} />}
        keyExtractor={(item) => item._id}
      />
    </Box>
  );
};
