import { ScrollView } from "react-native";
import { Stack } from "expo-router";
import { Box } from "native-base";
import SearchBar from "../../../components/SearchBar";
import CardCustomerItem from "../../../components/CardCustomerItem";

export default customer = () => {
  const repeat = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  return (
    <Box bg="white" safeArea flex="1">
      <Stack.Screen options={{ headerShown: false }} />
      <SearchBar />
      <ScrollView>
        {repeat.map(() => (
          <CardCustomerItem />
        ))}
      </ScrollView>
    </Box>
  );
};
