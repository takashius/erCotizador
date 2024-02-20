import { Stack } from "expo-router";
import { Box, Button, HStack, Heading, Icon, VStack } from "native-base";
import { useState } from "react";
import { Image, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Pressable } from "react-native";
import { InputForm } from "../components";
import { t } from "i18next";
import { Register } from "../types/general";
import { MaterialIcons } from "@expo/vector-icons";
const width = 170;
const ratio = (width * 0.8) / 270;

export default function register() {
  const logo = require("../assets/images/logo.png");
  const [show, setShow] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setData] = useState<Register>({});

  const validate = (formData: any) => {
    if (formData.name === undefined) {
      setErrors({
        ...errors,
        name: 'Name is required'
      });
      return false;
    } else if (formData.name.length < 3) {
      setErrors({
        ...errors,
        name: 'Name is too short'
      });
      return false;
    }

    return true;
  };

  const onSubmit = () => {
    validate(formData) ? console.log('Submitted') : console.log('Validation Failed');
  };

  return (
    <Box safeArea flex={1} p={2} w="100%" padding='5' mx="auto" bgColor={"blue.100"}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <HStack alignItems="center">
        <Image source={logo} style={styles.logo} />
        <VStack>
          <Heading size="lg" color="blue.500">
            {t('welcome')}
          </Heading>
          <Heading color="muted.400" size="xs">
            {t('signSubtitle')}
          </Heading>
        </VStack>
      </HStack>

      <ScrollView automaticallyAdjustKeyboardInsets>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <VStack space={2} mt={5}>
            <InputForm
              data={{
                name: "name",
                errors,
                title: t("name"),
                value: formData.name,
                formData,
                setData,
                require: true,
                description: t("products.nameDescription"),
              }}
            />
            <InputForm
              data={{
                name: "email",
                errors,
                title: t("email"),
                value: formData.email,
                formData,
                setData,
                require: true,
              }}
            />
            <InputForm
              data={{
                name: "password",
                errors,
                title: t("password"),
                value: formData.password,
                formData,
                setData,
                require: true,
                type: show ? "text" : "password",
                InputRightElement: (
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
                )
              }}
            />
            <InputForm
              data={{
                name: "repeatPassword",
                errors,
                title: t("repeatPassword"),
                value: formData.repeatPassword,
                formData,
                setData,
                require: true,
                type: showRepeat ? "text" : "password",
                InputRightElement: (
                  <Pressable onPress={() => setShowRepeat(!showRepeat)}>
                    <Icon
                      as={
                        <MaterialIcons
                          name={showRepeat ? "visibility" : "visibility-off"}
                        />
                      }
                      size={6}
                      mr="2"
                      color="muted.400"
                    />
                  </Pressable>
                )
              }}
            />

            <Heading color="blue.300" my='3' size="lg">
              {t('company.data')}
            </Heading>

            <InputForm
              data={{
                name: "companyName",
                errors,
                title: t("company.name"),
                value: formData.companyName,
                formData,
                setData,
                require: true,
                description: t("products.nameDescription"),
              }}
            />
            <InputForm
              data={{
                name: "docId",
                errors,
                title: t("company.docId"),
                value: formData.docId,
                formData,
                setData,
                require: true,
              }}
            />

            <VStack space={2} mt={5}>
              <Button bgColor={"blue.500"} rounded={"3xl"} onPress={onSubmit}>
                {t('signUp')}
              </Button>
            </VStack>
          </VStack>
        </KeyboardAvoidingView>
      </ScrollView>
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