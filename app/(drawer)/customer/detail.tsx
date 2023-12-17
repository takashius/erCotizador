import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { FlatList } from "react-native";
import {
  Box,
  Heading,
  Stack as _Stack,
  Text,
  HStack,
  Icon,
  VStack,
} from "native-base";
import { useOptions, CardAddressItem, Spinner } from "../../../components";
import { t } from "i18next";
import { useNavigation } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useGetCustomer } from "../../../api/customer";
import { MenuItem } from "../../../types/general";

export default () => {
  const params = useLocalSearchParams();
  const { id } = params;
  const navigation = useNavigation();
  const menu: Array<MenuItem> = [];
  const responseQuery = useGetCustomer(id);

  return (
    <Box bg="white" safeArea flex="1">
      <Stack.Screen
        options={useOptions(t("customer.detail"), navigation, true, true)}
      />
      {responseQuery.isLoading || responseQuery.isFetching ? (
        <Spinner />
      ) : (
        <_Stack px="4" space={0}>
          <_Stack space={2} pb="2">
            <Heading size="md" ml="-1" color={"blue.500"}>
              {responseQuery.data?.title}
            </Heading>
            <Text fontSize="lg" fontWeight="500">
              {responseQuery.data?.name} {responseQuery.data?.lastname}
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
                <Text>{responseQuery.data?.email}</Text>
              </HStack>
              <HStack>
                {responseQuery.data?.phone && (
                  <Icon
                    marginTop={1}
                    as={<MaterialIcons name="phone" />}
                    size={4}
                    color={"blue.500"}
                  />
                )}
                <Text> {responseQuery.data?.phone}</Text>
              </HStack>
            </VStack>
            <VStack flex={1} alignItems={"flex-end"}>
              <Text>Rif: {responseQuery.data?.rif}</Text>
              <HStack>
                <Icon
                  marginTop={1}
                  as={<MaterialIcons name="location-city" />}
                  size={4}
                  color={"blue.500"}
                />
                <Text> {responseQuery.data?.addresses.length}</Text>
              </HStack>
            </VStack>
          </HStack>

          <_Stack space={2} pt="5" pb="3">
            <Heading size="md" ml="-1" color={"blue.500"}>
              Direcciones
            </Heading>
          </_Stack>
          <FlatList
            data={responseQuery.data?.addresses}
            renderItem={({ item }) => <CardAddressItem item={item} />}
            keyExtractor={(item) => item._id}
          />
        </_Stack>
      )}
    </Box>
  );
};
