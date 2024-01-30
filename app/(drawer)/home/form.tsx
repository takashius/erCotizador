import { Stack, useLocalSearchParams, useNavigation } from "expo-router";
import { useState } from "react";
import { useOptions, Spinner, FormCustomer } from "../../../components";
import { Box } from "native-base";
import { t } from "i18next";

export default () => {
  const params = useLocalSearchParams();
  const { post } = params;
  const navigation = useNavigation();
  const [errors, setErrors] = useState({});

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

    </Box>
  )
}