import { Image, Dimensions, StyleSheet, Alert } from "react-native";
import { Box, Input, Icon, Pressable, Text, Button } from "native-base";
import Spinner from "../components/helpers/Spinner";
import { Stack, router } from "expo-router";
import { write, read } from "../components/helpers/LocalStorage";
import { MaterialIcons } from "@expo/vector-icons";
import { useLogin } from "../components/api/auth";
import { useState, useEffect } from "react";
const { width } = Dimensions.get("screen");
const ratio = (width * 0.8) / 270;

export default function login() {
  const logo = require("../assets/images/logo.png");
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const responseQuery = useLogin(username, password);

  const submitForm = () => {
    if (!username || !password)
      return Alert.alert("Error", "Please fill all fields!");
    responseQuery.refetch();
  };

  useEffect(() => {
    if (responseQuery.error) {
      setUsername("");
      setPassword("");
      Alert.alert("Error", "Usuario o contraseña incorrecta");
    }
  }, [responseQuery.isError]);

  useEffect(() => {
    readUserLogged();
  }, []);

  const readUserLogged = async () => {
    const data = await read("userToken");
    if (data) {
      router.replace("/(drawer)/home");
    }
  };

  useEffect(() => {
    const response = responseQuery.data;
    if (response) {
      write("userToken", response.token).then((res) => res);
      write("userId", response._id).then((res) => res);
      write("userName", response.name).then((res) => res);
      write("userLastName", response.lastname).then((res) => res);
      write("userEmail", response.email).then((res) => res);
      setUsername("");
      setPassword("");
      router.replace("/(drawer)/home");
    }
  }, [responseQuery.isSuccess]);

  const renderBodyLogin = () => (
    <Box>
      <Box alignSelf={"center"} marginTop={10}>
        <Text fontSize="xl" color={"coolGray.500"}>
          Login
        </Text>
      </Box>
      <Box marginTop={"1"} p="10" pb={4} pt={10}>
        <Input
          variant="underlined"
          onChangeText={setUsername}
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
          onChangeText={setPassword}
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
        <Button bgColor={"blue.500"} rounded={"3xl"} onPress={submitForm}>
          Login
        </Button>
      </Box>
      <Box paddingX={20} marginTop={2}>
        <Button rounded={"3xl"}>Registrar</Button>
      </Box>
    </Box>
  );

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
      {responseQuery.isFetching ? <Spinner /> : renderBodyLogin()}
    </Box>
  );
}
const styles = StyleSheet.create({
  logo: {
    width: width * 0.8,
    height: 100 * ratio,
    resizeMode: "contain",
  },
  spinner: {
    marginBottom: 50,
  },
});
