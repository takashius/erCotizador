import { Stack, useLocalSearchParams, useNavigation } from "expo-router";
import {
  Box,
  VStack,
  HStack,
  Text,
  FormControl,
  Switch,
  Input,
  Button,
} from "native-base";
import { useOptions } from "../../../components/helpers/OptionsScreens";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCreateProduct } from "../../../components/api/product";
import { useMutation } from "@tanstack/react-query";
import ERDEAxios from "../../../components/api/ERDEAxios";
import { ProductForm } from "../../../components/types/products";

export default () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [formData, setData] = useState<ProductForm>({
    name: "",
    iva: false,
    price: 0.0,
    description: "",
    _id: "",
  });
  const [errors, setErrors] = useState({});
  const params = useLocalSearchParams();
  const { post } = params;
  if (post === "edit") {
    formData._id = params["_id"] as string;
    formData.name = params["name"] as string;
    formData.description = params["description"] as string;
    formData.price = Number(params["price"]);
    formData.iva = params["price"] === "true" ? true : false;
  }

  const mutation = useMutation({
    mutationFn: (data: ProductForm) => {
      return ERDEAxios.post("/product", data);
    },
  });

  const validate = () => {
    if (formData.name === undefined) {
      setErrors({ ...errors, name: t("products.validations.nameRequired") });
      return false;
    } else if (formData.name.length < 3) {
      setErrors({ ...errors, name: t("products.validations.nameShort") });
      return false;
    } else if (formData.price === undefined) {
      setErrors({ ...errors, price: t("products.validations.priceRequired") });
      return false;
    } else if (formData.price < 0) {
      setErrors({ ...errors, price: t("products.validations.priceIncorrect") });
      return false;
    }
    setErrors({});
    return true;
  };

  const onSubmit = () => {
    validate() && submitForm();
  };

  const submitForm = () => {
    if (post === "new") {
      // const product = useCreateProduct(formData);
      const product = mutation.mutate(formData);
    }
  };

  return (
    <Box bg="white" safeArea flex="1">
      <Stack.Screen
        options={useOptions(
          post == "new" ? t("products.new") : t("products.edit"),
          true,
          navigation
        )}
      />
      <VStack mx="3">
        <FormControl isRequired isInvalid={"name" in errors}>
          <FormControl.Label
            _text={{
              bold: true,
            }}
          >
            {t("name")}
          </FormControl.Label>
          <Input
            placeholder={t("products.placeholder.name")}
            value={formData.name}
            onChangeText={(value) => setData({ ...formData, name: value })}
          />
          {"name" in errors ? (
            <FormControl.ErrorMessage>{errors.name}</FormControl.ErrorMessage>
          ) : (
            <FormControl.HelperText>
              {t("products.nameDescription")}
            </FormControl.HelperText>
          )}
        </FormControl>
        <FormControl isInvalid={"description" in errors}>
          <FormControl.Label
            _text={{
              bold: true,
            }}
          >
            {t("description")}
          </FormControl.Label>
          <Input
            placeholder={t("products.placeholder.description")}
            value={formData.description}
            onChangeText={(value) =>
              setData({ ...formData, description: value })
            }
          />
        </FormControl>
        <FormControl isRequired isInvalid={"price" in errors}>
          <FormControl.Label
            _text={{
              bold: true,
            }}
          >
            {t("price")}
          </FormControl.Label>
          <Input
            keyboardType="number-pad"
            value={String(formData.price)}
            placeholder={t("products.placeholder.price")}
            onChangeText={(value) =>
              setData({ ...formData, price: Number(value) })
            }
          />
          {"price" in errors ? (
            <FormControl.ErrorMessage>{errors.price}</FormControl.ErrorMessage>
          ) : (
            <FormControl.HelperText>
              {t("products.priceDescription")}
            </FormControl.HelperText>
          )}
        </FormControl>
        <HStack alignItems="center" space={4}>
          <Text>{t("tax")}</Text>
          <Switch
            size="sm"
            offTrackColor="blue.100"
            onTrackColor="blue.200"
            onThumbColor="blue.500"
            offThumbColor="blue.50"
            value={formData.iva}
            onValueChange={() => {
              setData({ ...formData, iva: !formData.iva });
            }}
          />
        </HStack>
        <Button bgColor={"blue.500"} rounded={"3xl"} onPress={onSubmit} mt="5">
          {t("submit")}
        </Button>
      </VStack>
    </Box>
  );
};
