import { Stack, useLocalSearchParams, useNavigation } from "expo-router";
import { Box, VStack, HStack, Text, Switch, Button } from "native-base";
import { useOptions } from "../../../components/helpers/OptionsScreens";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCreateProduct } from "../../../components/api/product";
import { useMutation } from "@tanstack/react-query";
import ERDEAxios from "../../../components/api/ERDEAxios";
import { ProductForm } from "../../../components/types/products";
import { InputForm } from "../../../components/Form";

export default () => {
  const { t } = useTranslation();
  const params = useLocalSearchParams();
  const { post } = params;
  const navigation = useNavigation();
  const [errors, setErrors] = useState({});
  const [formData, setData] = useState<ProductForm>(
    post === "new"
      ? {
          name: "",
          iva: false,
          price: 0.0,
          description: "",
          _id: "",
        }
      : {
          name: params["name"] as string,
          iva: params["iva"] === "true" ? true : false,
          price: Number(params["price"]),
          description: params["description"] as string,
          _id: params["id"] as string,
        }
  );

  const mutation = useMutation({
    mutationFn: (data: ProductForm) => {
      return ERDEAxios.post("/product", data);
    },
  });

  const validate = () => {
    if (formData.name === undefined || formData.name === "") {
      setErrors({ ...errors, name: t("products.validations.nameRequired") });
      return false;
    } else if (formData.name.length < 3) {
      setErrors({ ...errors, name: t("products.validations.nameShort") });
      return false;
    } else if (!formData.price) {
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
    console.log(formData);
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
        <InputForm
          data={{
            name: "name",
            errors,
            title: t("name"),
            placeholder: t("products.placeholder.name"),
            value: String(params["name"]),
            formData,
            setData,
            require: true,
            description: t("products.nameDescription"),
          }}
        />
        <InputForm
          data={{
            name: "description",
            errors,
            title: t("description"),
            placeholder: t("products.placeholder.description"),
            value: String(params["description"]),
            formData,
            setData,
          }}
        />
        <InputForm
          data={{
            name: "price",
            errors,
            title: t("price"),
            placeholder: t("products.placeholder.price"),
            value: String(params["price"]),
            formData,
            setData,
            keyboardType: "number-pad",
            require: true,
            description: t("products.priceDescription"),
          }}
        />
        <HStack alignItems="center" space={4}>
          <Text>{t("tax")}</Text>
          <Switch
            size="sm"
            offTrackColor="blue.100"
            onTrackColor="blue.200"
            onThumbColor="blue.500"
            offThumbColor="blue.50"
            defaultIsChecked={params["iva"] === "true"}
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
