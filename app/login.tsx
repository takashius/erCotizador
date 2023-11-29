import { Image, Dimensions, StyleSheet } from "react-native";
import { Box, Input, Icon, Pressable, Text, Button } from "native-base";
import { Stack, router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useLogin } from "../components/api/auth";
import { useState } from "react";
const { width } = Dimensions.get("screen");
const ratio = (width * 0.8) / 270;

export default function login() {
  const logo = require("../assets/images/logo.png");
  const [show, setShow] = useState(false);
  const responseQuery = useLogin("takashi.onimaru@gmail.com", "abc.123456");
  if (!responseQuery.isFetched)
    console.log("QUERY RESPONSE", JSON.stringify(responseQuery.data, null, 2));
  return (
    <Box bgColor={"blue.100"} flex={1}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Box marginTop={"12"} alignSelf={"center"}>
        <Image source={logo} style={styles.logo} />
      </Box>
      <Box alignSelf={"center"} marginTop={10}>
        <Text fontSize="xl" color={"coolGray.500"}>
          Login {`${responseQuery.data}`}
        </Text>
      </Box>
      <Box marginTop={"1"} p="10" pb={4} pt={10}>
        <Input
          variant="underlined"
          size="lg"
          placeholder="Username"
          InputRightElement={
            <Icon
              as={<MaterialIcons name="person" />}
              size={7}
              ml="2"
              color="muted.400"
            />
          }
        />
      </Box>
      <Box marginTop={"1"} p="10" pb={4} pt={4}>
        <Input
          variant="underlined"
          size="lg"
          placeholder="Password"
          type={show ? "text" : "password"}
          InputRightElement={
            <Pressable onPress={() => setShow(!show)}>
              <Icon
                as={
                  <MaterialIcons
                    name={show ? "visibility" : "visibility-off"}
                  />
                }
                size={6}
                mr="2"
                color="muted.400"
              />
            </Pressable>
          }
        />
      </Box>
      <Box paddingX={20} marginTop={9}>
        <Button
          bgColor={"blue.500"}
          rounded={"3xl"}
          onPress={() => router.replace("/(drawer)/home")}
        >
          Login
        </Button>
      </Box>
      <Box paddingX={20} marginTop={2}>
        <Button rounded={"3xl"}>Registrar</Button>
      </Box>
    </Box>
  );
}
const styles = StyleSheet.create({
  logo: {
    width: width * 0.8,
    height: 100 * ratio,
    resizeMode: "contain",
  },
});
