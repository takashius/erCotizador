import { Box, HStack, Switch, Text } from "native-base";
import { ProductsFormProps } from "../types/general";
import { InputForm, SelectForm } from "./Form";
import { t } from "i18next";
import { Spinner } from ".";

const FormProduct = (props: ProductsFormProps) => {
  const { post, params, errors, setErrors, formData, setData, productList } = props;

  return (
    <Box>
      {productList.isPending ? (
        <Spinner />
      ) : (
        <SelectForm
          data={{
            name: "master",
            errors,
            selectData: productList.data,
            readonly: true,
            title: t("products.title"),
            placeholder: t("cotiza.placeholder.product"),
            value: formData.master,
            require: true,
            formData,
            setData,
          }} />
      )}
      <InputForm
        data={{
          name: "price",
          errors,
          title: t("price"),
          placeholder: t("products.placeholder.price"),
          value: String(formData.price),
          formData,
          setData,
          keyboardType: "number-pad",
          require: true,
        }}
      />
      <InputForm
        data={{
          name: "amount",
          errors,
          title: t("amount"),
          placeholder: t("products.placeholder.amount"),
          value: String(formData.amount),
          formData,
          setData,
          keyboardType: "number-pad",
          require: true,
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
          defaultIsChecked={params ? params["iva"] === "true" : false}
          onValueChange={() => {
            setData({ ...formData, iva: formData?.iva });
          }}
        />
      </HStack>
    </Box>
  );
}

export default FormProduct;