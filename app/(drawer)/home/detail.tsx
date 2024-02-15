import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams, useNavigation } from "expo-router";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { SwipeListView } from "react-native-swipe-list-view";
import * as FileSystem from 'expo-file-system';
import { Alert, Animated, View } from "react-native";
import * as Sharing from "expo-sharing";
import { Buffer } from "buffer";
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
  Spinner,
  DeleteButton,
  read, remove, Card, CardProductItem, ModalProducts
} from "../../../components";
import { useGetCotiza, useDeleteProduct, useGetPdf, useSendCotiza } from "../../../api/cotiza";
import { t } from "i18next";
import { ProductForm } from "../../../types/products";
import { MenuItem } from "../../../types/general";

export default () => {
  const params = useLocalSearchParams();
  const [submit, setSubmit] = useState(false);
  const [toEdit, setToEdit] = useState<ProductForm>();
  const [open, setOpen] = useState(false);
  const [post, setPost] = useState<string>("");
  const [dataList, setDataList] = useState<ProductForm[] | undefined>();

  const { id } = params;
  const navigation = useNavigation();
  const responseQuery = useGetCotiza(id);
  const deleteProductMutation = useDeleteProduct();
  const getPdf = useGetPdf();
  const sendCotiza = useSendCotiza();

  const saveReportFile = async (pdfData: any) => {
    try {
      const buff = Buffer.from(pdfData, 'base64');
      const pdf = buff.toString('base64');
      const fileUri = FileSystem.documentDirectory + `${encodeURI('invoice_' + responseQuery.data?.number)}.pdf`;
      await FileSystem.writeAsStringAsync(fileUri, pdf, { encoding: FileSystem.EncodingType.Base64 });
      await Sharing.shareAsync(fileUri);
    } catch (error) {
      Alert.alert('Error', `Could not Download file ${error}`);
    }
  }

  useEffect(() => {
    setDataList(responseQuery.data?.products);
  }, [responseQuery.data]);

  useEffect(() => {
    if (submit) {
      setSubmit(false);
      responseQuery.refetch();
    }
  }, [submit]);

  useEffect(() => {
    if (getPdf.isSuccess) {
      saveReportFile(getPdf.data)
    }
  }, [getPdf.isSuccess]);

  useEffect(() => {
    if (sendCotiza.isSuccess) {
      Alert.alert("Exito", "Se ha enviado la cotización correctamente");
    }
  }, [sendCotiza.isSuccess]);

  const deleteRow = (rowMap: any, rowKey: any) => {
    if (dataList !== undefined) {
      rowMap[rowKey].closeRow();
      const config = {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      };
      Animated.timing(new Animated.Value(50), config).start(() => {
        const newData = [...dataList];
        const prevIndex = dataList.findIndex(
          (item: any) => item._id === rowKey
        );
        newData.splice(prevIndex, 1);
        setDataList(newData);
      });
    }
  };

  const onEditClick = (item: ProductForm) => {
    setOpen(true);
    setPost("edit");
    item.id = responseQuery.data?._id!;
    setToEdit(item);
  }
  const menuItems: MenuItem[] = [{
    icon: 'edit',
    title: t('edit'),
    onPress: () => { alert("Under Construction") },
    isDisabled: false
  }, {
    icon: 'picture-as-pdf',
    title: t('pdf'),
    onPress: () => { getPdf.mutate(responseQuery.data?._id!) },
    isDisabled: false
  },
  {
    icon: 'outgoing-mail',
    title: t('sendMail'),
    onPress: () => { sendCotiza.mutate(responseQuery.data?._id!) },
    isDisabled: false
  },
  {
    icon: 'delete',
    title: t('delete'),
    onPress: () => {
      Alert.alert(t('delete'), t('deleteMessage'), [
        {
          text: "OK",
          onPress: () => { alert("Under Construction") }
        },
        {
          text: t('cancel'),
          onPress: () => console.log('Cancel Pressed')
        }
      ])
    },
    isDisabled: false
  }]

  return (
    <Box bg="white" safeArea flex="1">
      <Stack.Screen
        options={useOptions({
          title: t("cotiza.detail"),
          navigation,
          back: true,
          dropdown: true,
          menuItems: menuItems
        })}
      />
      {responseQuery.isLoading || getPdf.isPending || sendCotiza.isPending ? (
        <Spinner />
      ) : (
        <_Stack p="4" pt="0" space={0}>
          <_Stack space={2} pb="2">
            <Heading size="md" color={"blue.500"}>
              {responseQuery.data?.title}
            </Heading>
          </_Stack>
          <HStack>
            <HStack mr="4">
              <Icon
                marginTop={1}
                marginRight={2}
                as={<MaterialIcons name="receipt" />}
                size={4}
                color={"blue.500"}
              />
              <Text>{responseQuery.data?.number}</Text>
            </HStack>
            <HStack mr="4">
              <Icon
                marginTop={1}
                marginRight={2}
                as={<MaterialIcons name="calendar-today" />}
                size={4}
                color={"blue.500"}
              />
              <Text>{responseQuery.data?.date}</Text>
            </HStack>
            <HStack mr="4">
              <Icon
                marginTop={1}
                marginRight={2}
                as={<MaterialIcons name="attach-money" />}
                size={4}
                color={"blue.500"}
              />
              <Text>{responseQuery.data?.rate}</Text>
            </HStack>
          </HStack>

          <_Stack space={2} pb="2">
            <Heading size="md" mt="5" color={"blue.500"}>
              {t("customer.detail")}
            </Heading>
          </_Stack>
          <HStack justifyContent="center">
            <Card>
              <_Stack p="4" space={0}>
                <_Stack space={2} pb="2">
                  <Heading size="md" ml="-1" color={"blue.500"}>
                    {responseQuery.data?.customer?.title}
                  </Heading>
                  <Text fontSize="lg" fontWeight="500">
                    {responseQuery.data?.customer?.name} {responseQuery.data?.customer?.lastname}
                  </Text>
                </_Stack>
                <VStack>
                  <HStack>
                    <Icon
                      marginTop={1}
                      marginRight={2}
                      as={<MaterialIcons name="mail" />}
                      size={4}
                      color={"blue.500"}
                    />
                    <Text>{responseQuery.data?.customer?.email}</Text>
                  </HStack>
                  {responseQuery.data?.customer?.phone && (
                    <HStack>
                      <Icon
                        marginTop={1}
                        as={<MaterialIcons name="phone" />}
                        size={4}
                        color={"blue.500"}
                      />
                      <Text> {responseQuery.data?.customer?.phone}</Text>
                    </HStack>
                  )}
                  <Text>Rif: {responseQuery.data?.customer?.rif}</Text>
                </VStack>
              </_Stack>
            </Card>
          </HStack>

          <_Stack space={2} pt="5" pb="3">
            <Heading size="md" ml="-1" color={"blue.500"}>
              {t("products.title")}
            </Heading>
          </_Stack>

          {responseQuery.isFetching || deleteProductMutation.isPending ? (
            <Spinner />
          ) : (
            <SwipeListView
              data={dataList}
              useFlatList={true}
              disableRightSwipe={true}
              closeOnRowBeginSwipe={true}
              renderItem={({ item }) => (
                <CardProductItem openLink={false} item={item} onClick={onEditClick} />
              )}
              keyExtractor={(item: any) => item._id}
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
                    deleteMutation={deleteProductMutation}
                    idParent={responseQuery.data!._id}
                    deleteRow={deleteRow}
                  />
                </View>
              )}
              rightOpenValue={-75}
            />
          )}

        </_Stack>
      )}
      <ModalProducts
        idCotiza={responseQuery.data?._id!}
        open={open}
        setOpen={setOpen}
        setSubmit={setSubmit}
        post={post}
        params={toEdit}
      />
      <Fab
        renderInPortal={false}
        shadow={2}
        backgroundColor={"blue.500"}
        onPress={() => {
          setOpen(true);
          setPost("new");
        }}
        size="sm"
        icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />}
      />
    </Box>
  )
}