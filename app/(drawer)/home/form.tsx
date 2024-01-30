import { Stack, useLocalSearchParams, useNavigation } from "expo-router";
import { useState } from "react";
import { useOptions, Spinner, FormCustomer, InputForm } from "../../../components";
import { Box, Button, VStack } from "native-base";
import { t } from "i18next";

export default () => {
  const params = useLocalSearchParams();
  const { post } = params;
  const navigation = useNavigation();
  const [errors, setErrors] = useState({});
  const defaultData = {
    title: "",
    description: "",
    number: "",
    id: "",
  };
  const [formData, setData] = useState<any>(defaultData);

  const onSubmit = () => {
  };

  const renderForm = () => (
    <VStack mx="3">
      <InputForm
        data={{
          name: "title",
          errors,
          title: t("title"),
          placeholder: t("cotiza.placeholder.title"),
          value: formData.title,
          formData,
          setData,
          require: true,
          description: t("cotiza.titleDescription"),
        }}
      />
      <InputForm
        data={{
          name: "description",
          errors,
          title: t("description"),
          placeholder: t("cotiza.placeholder.description"),
          value: formData.description,
          formData,
          setData,
        }}
      />
      <InputForm
        data={{
          name: "number",
          errors,
          title: t("number"),
          placeholder: t("cotiza.placeholder.number"),
          value: String(formData.number),
          formData,
          setData,
          keyboardType: "number-pad",
          require: true,
        }}
      />
      <Button bgColor={"blue.500"} rounded={"3xl"} onPress={onSubmit} mt="5">
        {t("submit")}
      </Button>
    </VStack>
  );

  return (
    <Box bg="white" safeArea flex="1">
      <Stack.Screen
        options={useOptions(
          {
            title: post == "new" ? t("cotiza.new") : t("cotiza.edit"),
            navigation,
            back: true
          }
        )}
      />
      {renderForm()}
    </Box>
  )
}