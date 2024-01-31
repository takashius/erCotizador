import { Stack, router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { useOptions, Spinner, InputForm, read, SelectForm } from "../../../components";
import { Box, Button, VStack } from "native-base";
import { t } from "i18next";
import { DatePicker } from 'react-native-woodpicker';
import { KeyboardAvoidingView, Platform } from "react-native";
import { CotizaForm } from "../../../types/cotiza";
import { useCreateCotiza, useUpdateCotiza } from "../../../api/cotiza";
import { useListSimpleCustomer } from "../../../api/customer";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { InputDate } from "../../../components/Form";

export default () => {
  const params = useLocalSearchParams();
  const { post } = params;
  const navigation = useNavigation();
  const [errors, setErrors] = useState({});
  const [locationUser, setLocationUser] = useState<string>('');
  const [pickedDate, setPickedDate] = useState<Date | null>(null);
  const createMutation = useCreateCotiza();
  const updateMutation = useUpdateCotiza();
  const customerList = useListSimpleCustomer();
  const defaultData = {
    title: "",
    description: "",
    number: 0,
    date: "",
    customer: "",
    id: "",
  };

  const transformData = (params: any) => ({
    title: params.title,
    description: params.description,
    number: Number(params.number),
    date: params.date,
    customer: params.customer._id,
    id: params.id,
  });

  const [formData, setData] = useState<CotizaForm>(post === "new" ? defaultData : transformData(params));

  useEffect(() => {
    if (pickedDate) {
      const newDate = `${pickedDate.getDate()}/${pickedDate.getMonth() + 1}/${pickedDate.getFullYear()}`;
      setData({ ...formData, date: newDate });
    }
  }, [pickedDate]);

  useEffect(() => {
    read("locationUser")
      .then((location) => {
        setLocationUser(location);
      }
      )
  }, [])

  const validate = () => {
    if (formData.title === undefined || formData.title === "") {
      setErrors({ ...errors, title: t("cotiza.validations.titleRequired") });
      return false;
    } else if (formData.title.length < 3) {
      setErrors({ ...errors, title: t("cotiza.validations.titleShort") });
      return false;
    } else if (!formData.number) {
      setErrors({ ...errors, number: t("cotiza.validations.numberRequired") });
      return false;
    } else if (formData.number < 0) {
      setErrors({ ...errors, number: t("cotiza.validations.numberIncorrect") });
      return false;
    } else if (formData.date === undefined || formData.date === '') {
      setErrors({ ...errors, date: t("cotiza.validations.dateRequired") });
      return false;
    } else if (formData.customer === undefined || formData.customer === '') {
      setErrors({ ...errors, date: t("cotiza.validations.customerRequired") });
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
      createMutation.mutate(formData);
    } else {
      updateMutation.mutate(formData);
    }
  };

  const handleText = (): string => pickedDate
    ? pickedDate.toDateString()
    : "No value Selected";

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
      <DatePicker
        value={pickedDate!}
        onDateChange={setPickedDate}
        title={t('datePicker')}
        text=""
        isNullable={false}
        iosDisplay="inline"
        iosMode="date"
        InputComponent={(data) => {
          return (
            <>
              {Platform.OS === 'ios' ?
                <InputForm
                  data={{
                    name: "date",
                    errors,
                    onItemClick: data.togglePicker,
                    readonly: true,
                    title: t("date"),
                    placeholder: t("cotiza.placeholder.date"),
                    value: formData.date,
                    require: true,
                  }}
                />
                :
                <InputDate
                  data={{
                    name: "date",
                    errors,
                    onItemClick: data.togglePicker,
                    title: t("date"),
                    placeholder: t("cotiza.placeholder.date"),
                    value: formData.date,
                    require: true,
                  }}
                />
              }
            </>
          )
        }}
        locale={locationUser}
      />
      <SelectForm
        data={{
          name: "customer",
          errors,
          selectData: customerList.data,
          readonly: true,
          title: t("customer.detail"),
          placeholder: t("cotiza.placeholder.customer"),
          value: formData.customer,
          require: true,
          formData,
          setData,
        }} />
      <Button bgColor={"blue.500"} rounded={"3xl"} onPress={onSubmit} mt="5">
        {t("submit")}
      </Button>
    </VStack>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled>
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
        {createMutation.isPending || updateMutation.isPending ? (
          <Spinner />
        ) : createMutation.isSuccess || updateMutation.isSuccess ? (
          router.back()
        ) : (
          renderForm()
        )}
      </Box>
    </KeyboardAvoidingView>
  )
}