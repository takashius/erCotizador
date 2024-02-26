import { Stack, useNavigation } from "expo-router"
import { VStack, Box } from "native-base"
import { InputForm, useOptions } from "../../../components"
import { t } from "i18next"
import { useState } from "react"
import { Settings } from "../../../types/general"
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native"

export default () => {
  const navigation = useNavigation();
  const [errors, setErrors] = useState({});
  const defaultData: Settings = {
    id: "",
    iva: "",
    address: "",
    description: "",
    phone: "",
    rif: "",
  };
  const [formData, setData] = useState<Settings>(defaultData);

  const renderForm = () => (
    <VStack mx="3">
      <InputForm
        data={{
          name: "iva",
          errors,
          title: t("tax"),
          formData,
          setData,
          keyboardType: "decimal-pad"
        }}
      />
      <InputForm
        data={{
          name: "address",
          errors,
          title: t("address.title_single"),
          formData,
          setData,
        }}
      />
      <InputForm
        data={{
          name: "description",
          errors,
          title: t("description"),
          formData,
          setData,
        }}
      />
      <InputForm
        data={{
          name: "phone",
          errors,
          title: t("phone"),
          formData,
          setData,
          keyboardType: "phone-pad"
        }}
      />
      <InputForm
        data={{
          name: "rif",
          errors,
          title: t("rif"),
          formData,
          setData,
        }}
      />

    </VStack>
  );

  return (
    <Box safeArea flex={1} p={2} w="100%" padding='5' mx="auto">
      <Stack.Screen options={useOptions({ title: t("modules.settings"), navigation, back: true, save: true })} />
      <ScrollView automaticallyAdjustKeyboardInsets>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          {renderForm()}
        </KeyboardAvoidingView>
      </ScrollView>

    </Box>
  )
}