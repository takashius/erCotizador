import { Stack, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { useOptions, Spinner, InputForm, read, SelectForm } from "../../../components";
import { Box, Button, VStack } from "native-base";
import { t } from "i18next";
import { DatePicker } from 'react-native-woodpicker';

export default () => {
  const params = useLocalSearchParams();
  const { post } = params;
  const navigation = useNavigation();
  const [errors, setErrors] = useState({});
  const [locationUser, setLocationUser] = useState<string>('');
  const [pickedDate, setPickedDate] = useState<Date | null>(null);
  const defaultData = {
    title: "",
    description: "",
    number: "",
    date: "",
    id: "",
  };
  const [formData, setData] = useState<any>(defaultData);

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
            <InputForm
              data={{
                name: "date",
                errors,
                readonly: true,
                onItemClick: data.togglePicker,
                title: t("date"),
                placeholder: t("cotiza.placeholder.date"),
                value: formData.date,
                require: true,
              }}
            />
          )
        }}
        locale={locationUser}
      />
      <SelectForm
        data={{
          name: "date",
          errors,
          readonly: true,
          title: t("date"),
          placeholder: t("cotiza.placeholder.date"),
          value: formData.date,
          require: true,
        }} />
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