import { Stack, router, useNavigation } from "expo-router";
import { Box, Fab, Icon } from "native-base";
import { FlatList, View, Text, TouchableOpacity } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import CardProductItem from "../../../components/CardProductItem";
import SearchBar from "../../../components/SearchBar";
import { useListProduct } from "../../../api/product";
import Spinner from "../../../components/helpers/Spinner";
import { AntDesign } from "@expo/vector-icons";
import { useOptions } from "../../../components/helpers/OptionsScreens";
import { useTranslation } from "react-i18next";
import { FontAwesome } from "@expo/vector-icons";

export default () => {
  const { t } = useTranslation();
  const responseQuery = useListProduct();
  const navigation = useNavigation();

  return (
    <Box bg="white" safeArea flex="1">
      <Stack.Screen
        options={useOptions(t("modules.product"), false, navigation)}
      />
      <SearchBar />
      {responseQuery.isLoading && <Spinner />}
      <SwipeListView
        data={responseQuery.data}
        useFlatList={true}
        onRefresh={() => responseQuery.refetch()}
        refreshing={responseQuery.isFetching}
        renderItem={({ item }) => <CardProductItem item={item} />}
        renderHiddenItem={(data, rowMap) => (
          <TouchableOpacity
            onPress={() => {
              console.log("Entrando");
            }}
          >
            <View
              style={{
                marginLeft: 280,
                height: "90%",
                width: 60,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon
                marginTop={1}
                as={<FontAwesome name="times-circle" />}
                size={"5xl"}
                color={"red.500"}
              />
            </View>
          </TouchableOpacity>
        )}
        rightOpenValue={-75}
      />
      {/* <FlatList
        data={responseQuery.data}
        renderItem={({ item }) => <CardProductItem item={item} />}
        keyExtractor={(item) => item._id}
      /> */}
      <Fab
        renderInPortal={false}
        shadow={2}
        backgroundColor={"blue.500"}
        onPress={() => {
          router.push({
            pathname: "/(drawer)/products/form",
            params: { post: "new" },
          });
        }}
        size="sm"
        icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />}
      />
    </Box>
  );
};
