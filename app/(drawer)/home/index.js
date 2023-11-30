import { ScrollView, FlatList } from "react-native";
import { Stack } from "expo-router";
import { Box } from "native-base";
import SearchBar from "../../../components/SearchBar";
import CardCotizaItem from "../../../components/CardCotizaItem";
import { useListCotiza } from "../../../components/api/cotiza";
import Spinner from "../../../components/helpers/Spinner";

export default page = () => {
  const responseQuery = useListCotiza();

  return (
    <Box bg="white" safeArea flex="1">
      <Stack.Screen options={{ headerShown: false }} />
      <SearchBar />
      {responseQuery.isLoading && <Spinner />}
      <FlatList
        data={responseQuery.data}
        renderItem={({ item }) => <CardCotizaItem item={item} />}
        keyExtractor={(item) => item._id}
      />
    </Box>
  );
};
