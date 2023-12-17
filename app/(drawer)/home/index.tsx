import { FlatList } from "react-native";
import { Stack, useNavigation } from "expo-router";
import { Box } from "native-base";
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
      <Stack.Screen options={useOptions(t("modules.cotiza"), navigation)} />
      <SearchBar filterData={filterData} />
      {responseQuery.isLoading && <Spinner />}
      <FlatList
        data={dataList}
        renderItem={({ item }) => <CardCotizaItem item={item} />}
        keyExtractor={(item) => item._id}
      />
    </Box>
  );
};
