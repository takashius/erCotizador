import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { FlatList, View } from "react-native";
import {
  Box,
  Heading,
  Stack as _Stack,
  Text,
  HStack,
  Icon,
  Fab,
  VStack,
} from "native-base";
import {
  useOptions,
  CardAddressItem,
  Spinner,
  ModalAddress,
  DeleteButton,
} from "../../../components";
import { t } from "i18next";
import { useNavigation } from "expo-router";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useGetCustomer, useDeleteAddress } from "../../../api/customer";
import { MenuItem } from "../../../types/general";
import { SwipeListView } from "react-native-swipe-list-view";

export default () => {
  const params = useLocalSearchParams();
  const [open, setOpen] = useState(false);
  const [submit, setSubmit] = useState(false);
  const { id } = params;
  const navigation = useNavigation();
  const menu: Array<MenuItem> = [];
  const responseQuery = useGetCustomer(id);
  const deleteAddressMutation = useDeleteAddress();

  useEffect(() => {
    if (submit) {
      setSubmit(false);
      responseQuery.refetch();
    }
  }, [submit]);

  useEffect(() => {
    if (deleteAddressMutation.isSuccess) {
      responseQuery.refetch();
    }
  }, [deleteAddressMutation.isSuccess]);

  const deleteRow = (rowMap: any, rowKey: any) => {};

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
          <SwipeListView
            data={responseQuery.data?.addresses!}
            useFlatList={true}
            disableRightSwipe={true}
            closeOnRowBeginSwipe={true}
            renderItem={({ item }) => <CardAddressItem item={item} />}
            keyExtractor={(item: any) => item.id}
            contentContainerStyle={{ paddingBottom: 200 }}
            renderHiddenItem={(data, rowMap) => (
              <View
                style={{
                  marginLeft: 270,
                  height: "90%",
                  width: 60,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <DeleteButton
                  data={data}
                  rowMap={rowMap}
                  deleteMutation={deleteAddressMutation}
                  deleteRow={deleteRow}
                  idParent={responseQuery.data!._id}
                />
              </View>
            )}
            rightOpenValue={-75}
          />
        </_Stack>
      )}
      <ModalAddress
        idCustomer={responseQuery.data?._id!}
        open={open}
        setOpen={setOpen}
        setSubmit={setSubmit}
        post="new"
      />
      <Fab
        renderInPortal={false}
        shadow={2}
        backgroundColor={"blue.500"}
        onPress={() => setOpen(true)}
        size="sm"
        icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />}
      />
    </Box>
  );
};
