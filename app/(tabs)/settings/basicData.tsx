import { Stack, router, useNavigation } from "expo-router"
import { VStack, Box, useToast } from "native-base"
import { InputForm, Spinner, onError, useOptions, write } from "../../../components"
import { t } from "i18next"
import { useEffect, useState } from "react"
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native"
import { useGetCompany, useSetConfig, useUploadImage } from "../../../api/company"
import { Company, Image } from "../../../types/company"
import { SelectImage } from "../../../components/Form"

export default () => {
  const navigation = useNavigation();
  const [errors, setErrors] = useState({});
  const responseQuery = useGetCompany();
  const uploadMutation = useUploadImage();
  const configMutation = useSetConfig();
  const toast = useToast();

  const [formData, setData] = useState<Company>();
  const [image, setImage] = useState<any>();

  useEffect(() => {
    if (responseQuery.isSuccess) {
      setData(responseQuery.data)
      setData({ ...responseQuery.data, id: responseQuery.data._id })
    }
  }, [responseQuery.isSuccess])

  useEffect(() => {
    if (image) {
      uploadMutation.mutate({ image, imageType: 'logo' });
    }
  }, [image])

  useEffect(() => {
    if (configMutation.isSuccess) {
      router.back();
      toast.show({
        title: t('settings.toastSave')
      })
    }
  }, [configMutation.isSuccess]);

  useEffect(() => {
    if (configMutation.isError) {
      onError(configMutation.error);
    }
  }, [configMutation.isError]);

  const saveAction = () => {
    configMutation.mutate(formData!)
  }

  const renderForm = () => (
    <VStack mx="3">
      <InputForm
        data={{
          name: "iva",
          errors,
          title: t("tax"),
          value: String(formData?.iva),
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
          value: formData?.address,
          formData,
          setData,
        }}
      />
      <InputForm
        data={{
          name: "description",
          errors,
          title: t("description"),
          value: formData?.description,
          formData,
          setData,
        }}
      />
      <InputForm
        data={{
          name: "phone",
          errors,
          title: t("phone"),
          value: formData?.phone,
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
          value: formData?.rif,
          formData,
          setData,
        }}
      />
      <SelectImage
        data={{
          name: "logo",
          title: t("logo"),
          value: String(formData?.logo),
          setImage,
          isLoading: uploadMutation.isPending
        }}
      />

    </VStack>
  );

  return (
    <Box safeArea flex={1} p={2} w="100%" padding='5' mx="auto">
      <Stack.Screen options={useOptions({ title: t("modules.settings"), navigation, back: true, save: true, saveAction })} />
      <ScrollView automaticallyAdjustKeyboardInsets>
        <KeyboardAvoidingView
          behavior={'padding'}
        >
          {responseQuery.isLoading || configMutation.isPending ? (
            <Spinner />
          ) : renderForm()
          }
        </KeyboardAvoidingView>

      </ScrollView>

    </Box>
  )
}