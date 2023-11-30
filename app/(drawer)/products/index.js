import { Stack } from "expo-router";
import { Box } from "native-base";
import { FlatList } from "react-native";
import CardProductItem from "../../../components/CardProductItem";
import SearchBar from "../../../components/SearchBar";
import { useListProduct } from "../../../components/api/product";
import Spinner from "../../../components/helpers/Spinner";

export default products = () => {
  const responseQuery = useListProduct();

  return (
    <Box bg="white" safeArea flex="1">
      <Stack.Screen options={{ headerShown: false }} />
      <SearchBar />
      {responseQuery.isLoading && <Spinner />}
      <FlatList
        data={responseQuery.data}
        renderItem={({ item }) => <CardProductItem item={item} />}
        keyExtractor={(item) => item._id}
      />
    </Box>
  );
};
