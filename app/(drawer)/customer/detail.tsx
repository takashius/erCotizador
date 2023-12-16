import { Stack } from "expo-router";
import { Box } from "native-base";
import { useOptions } from "../../../components";
import { t } from "i18next";
import { useNavigation } from "expo-router";

export default () => {
  const navigation = useNavigation();

  return (
    <Box bg="white" safeArea flex="1">
      <Stack.Screen options={useOptions(t("products.new"), true, navigation)} />
    </Box>
  );
};
