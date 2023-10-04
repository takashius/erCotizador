import { ScrollView } from "react-native";
import { Stack } from "expo-router";
import { Box, Stack as _Stack } from "native-base";
import SearchBar from "../../../components/SearchBar";
import CardCotizaItem from "../../../components/CardCotizaItem";

export default page = () => {
  const repeat = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  return (
    <Box bg="white" safeArea flex="1">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <SearchBar />
      <ScrollView>
        {repeat.map(() => (
          <CardCotizaItem />
        ))}
      </ScrollView>
    </Box>
  );
};
