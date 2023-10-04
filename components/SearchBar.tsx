import { VStack, Input, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

const SearchBar = () => {
  return (
    <VStack w="90%" alignSelf="center" marginBottom={4}>
      <Input
        placeholder="Buscar"
        width="100%"
        borderRadius="4"
        py="3"
        px="1"
        fontSize="14"
        InputLeftElement={
          <Icon
            m="2"
            ml="3"
            size="6"
            color="gray.400"
            as={<MaterialIcons name="search" />}
          />
        }
      />
    </VStack>
  );
};

export default SearchBar;