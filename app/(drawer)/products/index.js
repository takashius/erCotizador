import { Stack, router, useNavigation } from "expo-router";
import { Box, Fab, Icon } from "native-base";
import { FlatList } from "react-native";
import CardProductItem from "../../../components/CardProductItem";
import SearchBar from "../../../components/SearchBar";
import { useListProduct } from "../../../components/api/product";
import Spinner from "../../../components/helpers/Spinner";
import { AntDesign } from "@expo/vector-icons";
import { useOptions } from "../../../components/helpers/OptionsScreens";

export default products = () => {
  const responseQuery = useListProduct();
  const navigation = useNavigation();

  return (
    <Box bg="white" safeArea flex="1">
      <Stack.Screen options={useOptions("Productos", false, navigation)} />
      <SearchBar />
      {responseQuery.isLoading && <Spinner />}
      <FlatList
        data={responseQuery.data}
        renderItem={({ item }) => <CardProductItem item={item} />}
        keyExtractor={(item) => item._id}
      />
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
