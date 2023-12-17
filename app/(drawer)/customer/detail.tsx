import React from "react";
import { Stack } from "expo-router";
import { FlatList, Pressable } from "react-native";
import {
  Box,
  Heading,
  Stack as _Stack,
  Text,
  HStack,
  Icon,
  VStack,
  Menu,
  HamburgerIcon,
} from "native-base";
import { useOptions, CardAddressItem } from "../../../components";
import { t } from "i18next";
import { useNavigation } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

const dataList: any = [
  {
    title: "Prueba 1",
    default: true,
  },
  {
    title: "Test 2",
    default: false,
  },
  {
    title: "Test 3",
    default: false,
  },
  {
    title: "Test 4",
    default: false,
  },
  {
    title: "Test 5",
    default: false,
  },
  {
    title: "Test 6",
    default: false,
  },
];

export default () => {
  const navigation = useNavigation();

  return (
    <Box bg="white" safeArea flex="1">
      <Stack.Screen
        options={useOptions(t("customer.detail"), navigation, true, true, [
          { isDisabled: false, onPress: () => {}, title: "" },
        ])}
      />
      <_Stack px="4" space={0}>
        <_Stack space={2} pb="2">
          <Heading size="md" ml="-1" color={"blue.500"}>
            Titulo del Cliente
          </Heading>
          <Text fontSize="lg" fontWeight="500">
            Nombre y Apellido
          </Text>
        </_Stack>
        <HStack space={3} justifyContent="left">
          <VStack flex={1}>
            <HStack>
              <Icon
                marginTop={1}
                marginRight={2}
                as={<MaterialIcons name="mail" />}
                size={4}
                color={"blue.500"}
              />
              <Text>correo@gmail.com</Text>
            </HStack>
            <HStack>
              <Icon
                marginTop={1}
                as={<MaterialIcons name="phone" />}
                size={4}
                color={"blue.500"}
              />
              <Text> 04143168556</Text>
            </HStack>
          </VStack>
          <VStack flex={1} alignItems={"flex-end"}>
            <Text>Rif: V-16134236</Text>
            <HStack>
              <Icon
                marginTop={1}
                as={<MaterialIcons name="location-city" />}
                size={4}
                color={"blue.500"}
              />
              <Text> 3</Text>
            </HStack>
          </VStack>
        </HStack>

        <_Stack space={2} pt="5" pb="3">
          <Heading size="md" ml="-1" color={"blue.500"}>
            Direcciones
          </Heading>
        </_Stack>
        <FlatList
          data={dataList}
          renderItem={({ item }) => <CardAddressItem item={item} />}
          keyExtractor={(item) => item._id}
        />
      </_Stack>
    </Box>
  );
};
