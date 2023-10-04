import { Stack } from "expo-router";
import { Box } from "native-base";

export default products = () => {
  return (
    <Box bg="white" safeArea flex="1">
      <Stack.Screen options={{ headerShown: false }} />
      Texto de prueba de productos
    </Box>
  );
};
