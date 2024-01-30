import { FlatList } from "react-native";
import { Stack, router, useNavigation } from "expo-router";
import { Box, Fab, Icon } from "native-base";
import {
  SearchBar,
  CardCotizaItem,
  Spinner,
  useOptions,
} from "../../../components";
import { useListCotiza } from "../../../api/cotiza";
import { useEffect, useState } from "react";
import { type Cotiza } from "../../../types/cotiza";
import { t } from "i18next";
import { AntDesign } from "@expo/vector-icons";

export default () => {
  const responseQuery = useListCotiza();
  const [dataList, setDataList] = useState<Cotiza[]>();
  const [dataDefault, setDataDefault] = useState<Cotiza[]>();
  const navigation = useNavigation();

  useEffect(() => {
    setDataList(responseQuery.data);
    setDataDefault(responseQuery.data);
  }, [responseQuery.data]);

  const filterData = (search: string) => {
    if (dataDefault) {
      setDataList(
        dataDefault.filter(
          (item: Cotiza) =>
            item.description.toUpperCase().includes(search.toUpperCase()) ||
            item.title.toUpperCase().includes(search.toUpperCase())
        )
      );
    }
  };

  return (
    <Box bg="white" safeArea flex="1">
      <Stack.Screen options={useOptions({ title: t("modules.cotiza"), navigation })} />
      <SearchBar filterData={filterData} />
      {responseQuery.isLoading && <Spinner />}
      <FlatList
        data={dataList}
        renderItem={({ item }) => <CardCotizaItem item={item} />}
        keyExtractor={(item) => item._id}
      />
      <Fab
        renderInPortal={false}
        shadow={2}
        backgroundColor={"blue.500"}
        onPress={() => {
          router.push({
            pathname: "/(drawer)/home/form",
            params: { post: "new" },
          });
        }}
        size="sm"
        icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />}
      />
    </Box>
  );
};
