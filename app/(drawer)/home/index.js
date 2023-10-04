import { Text } from "react-native";
import { Stack } from "expo-router";
import { Box } from "native-base";

export default page = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Box>Home Page</Box>
    </>
  );
};
