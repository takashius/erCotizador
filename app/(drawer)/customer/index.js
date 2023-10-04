import { Stack } from "expo-router";
import { Box } from "native-base";
import { ScrollView } from "react-native";
import CardCustomerItem from "../../../components/CardCustomerItem";
import SearchBar from "../../../components/SearchBar";

export default customer = () => {
  const repeat = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  return (
    <Box bg="white" safeArea flex="1" alignItems={"center"}>
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
