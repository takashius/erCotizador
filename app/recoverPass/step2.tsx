import { Image, Dimensions, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { Box, Button, Center, Heading, Icon, Input } from "native-base";
import { t } from "i18next";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
const { width } = Dimensions.get("screen");
const ratio = (width * 0.8) / 270;

export default () => {
  const [username, setUsername] = useState<string>("");
  const logo = require("../../assets/images/logo.png");

  const submitForm = () => {

  }

  return (
    <Box safeArea flex={1} p={2} w="100%" padding='5' mx="auto" bgColor={"blue.100"}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Box marginTop={"12"} alignSelf={"center"}>
        <Image source={logo} style={styles.logo} />
        <Center mt="6">
          <Heading size="lg" color="blue.500">
            {t('recoveryPass.step2.title')}
          </Heading>
          <Heading color="muted.400" size="xs" px="6">
            {t('recoveryPass.step2.subtitle')}
          </Heading>
        </Center>
      </Box>

      <Box marginTop={"1"} p="10" pb={4} pt={10}>
        <Input
          variant="underlined"
          onChangeText={setUsername}
          size="lg"
          placeholder={t('recoveryPass.step2.code')}
          InputRightElement={
            <Icon
              as={<MaterialIcons name="lock" />}
              size={7}
              ml="2"
              color="muted.400"
            />
          }
        />
      </Box>

      <Box paddingX={20} marginTop={9}>
        <Button bgColor={"blue.500"} rounded={"3xl"} onPress={submitForm}>
          {t('submit')}
        </Button>
      </Box>
    </Box>
  )
}

const styles = StyleSheet.create({
  logo: {
    width: width * 0.8,
    height: 100 * ratio,
    resizeMode: "contain",
  }
});