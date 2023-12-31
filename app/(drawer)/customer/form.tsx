import {
  Stack,
  useLocalSearchParams,
  router,
  useNavigation,
} from "expo-router";
import {
  Box,
  VStack,
  HStack,
  Text,
  Switch,
  Button,
  ScrollView,
} from "native-base";
import { useState } from "react";
import { t } from "i18next";
import { type CustomerForm } from "../../../types/customer";
import { useOptions, Spinner, FormCustomer } from "../../../components";
import { useCreateCustomer, useUpdateCustomer } from "../../../api/customer";

export default () => {
  const params = useLocalSearchParams();
  const { post } = params;
  const navigation = useNavigation();
  const [errors, setErrors] = useState({});
  const createMutation = useCreateCustomer();
  const updateMutation = useUpdateCustomer();
  const defaultData = {
    title: "",
    name: "",
    lastname: "",
    rif: "",
    email: "",
    phone: "",
    address: {
      title: "Default",
      city: "",
      line1: "",
      line2: "",
      zip: "",
    },
  };

  const transformData = (params: any) => ({
    title: "",
    name: "",
    lastname: "",
    rif: "",
    email: "",
    phone: "",
  });

  const [formData, setData] = useState<CustomerForm>(
    post === "new" ? defaultData : transformData(params)
  );

  const validate = (formData: CustomerForm) => {
    if (formData.title === undefined || formData.title === "") {
      setErrors({ ...errors, title: t("customer.validations.titleRequired") });
      return false;
    } else if (formData.name === undefined || formData.name === "") {
      setErrors({ ...errors, name: t("products.validations.nameRequired") });
      return false;
    } else if (formData.name.length < 3) {
      setErrors({ ...errors, name: t("products.validations.nameShort") });
      return false;
    } else if (formData.lastname === undefined || formData.lastname === "") {
      setErrors({
        ...errors,
        lastname: t("customer.validations.lastnameRequired"),
      });
      return false;
    } else if (formData.lastname.length < 3) {
      setErrors({
        ...errors,
        lastname: t("customer.validations.lastnameShort"),
      });
      return false;
    } else if (formData.email === undefined || formData.email === "") {
      setErrors({
        ...errors,
        email: t("customer.validations.emailRequired"),
      });
      return false;
    } else if (
      (formData.address!.city === undefined || formData.address!.city === "") &&
      post === "new"
    ) {
      setErrors({
        ...errors,
        "address.city": t("address.validations.city"),
      });
      return false;
    } else if (
      (formData.address!.line1 === undefined ||
        formData.address!.line1 === "") &&
      post === "new"
    ) {
      setErrors({
        ...errors,
        "address.line1": t("address.validations.line1"),
      });
      return false;
    } else if (
      (formData.address!.zip === undefined || formData.address!.zip === "") &&
      post === "new"
    ) {
      setErrors({
        ...errors,
        "address.zip": t("address.validations.zip"),
      });
      return false;
    }
    setErrors({});
    return true;
  };

  const onSubmit = () => {
    const data = orderData(formData);
    validate(data) && submitForm(data);
  };

  const orderData = (data: any) => {
    data.address.city = data["address.city"];
    data.address.line1 = data["address.line1"];
    data.address.line2 = data["address.line2"] ? data["address.line2"] : "";
    data.address.zip = data["address.zip"];
    return data;
  };

  const submitForm = (data: CustomerForm) => {
    console.log("SUBMIT FORM", data);
    if (post === "new") {
      createMutation.mutate(data);
    } else {
      updateMutation.mutate(data);
    }
  };

  return (
    <Box bg="white" safeArea flex="1">
      <Stack.Screen
        options={useOptions(
          post == "new" ? t("customer.new") : t("customer.edit"),
          navigation,
          true
        )}
      />
      <ScrollView marginBottom={6}>
        {createMutation.isPending || updateMutation.isPending ? (
          <Spinner />
        ) : createMutation.isSuccess || updateMutation.isSuccess ? (
          router.back()
        ) : (
          <FormCustomer
            post={"new"}
            params={params}
            errors={errors}
            setErrors={setErrors}
            formData={formData}
            setData={setData}
            onSubmit={onSubmit}
          />
        )}
      </ScrollView>
    </Box>
  );
};
