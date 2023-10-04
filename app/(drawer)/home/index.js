import { Text } from "react-native";
import { Stack } from "expo-router";

export default page = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Text>Home Page</Text>
    </>
  );
};
