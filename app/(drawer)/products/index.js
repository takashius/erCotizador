import { Stack } from "expo-router";
import { Box } from "native-base";
import { ScrollView } from "react-native";
import CardProductItem from "../../../components/CardProductItem";
import SearchBar from "../../../components/SearchBar";

export default products = () => {
  const repeat = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  return (
    <Box bg="white" safeArea flex="1">
      <Stack.Screen options={{ headerShown: false }} />
      <SearchBar />
      <ScrollView>
        {repeat.map(() => (
          <CardProductItem />
        ))}
      </ScrollView>
    </Box>
  );
};
