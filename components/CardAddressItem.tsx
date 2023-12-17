import {
  Box,
  Center,
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
  Stack as _Stack,
} from "native-base";
import Card from "./helpers/Card";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { type Address } from "../types/customer";

const CardAddressItem = ({ item }: { item: Address }) => {
  return (
    <Box alignItems="center" marginBottom={5}>
      <Card>
        <_Stack p="4" space={2}>
          <_Stack space={2}>
            <Heading size="sm" ml="-1" color={"blue.500"}>
              <HStack>
                <Icon
                  marginTop={1}
                  as={<MaterialIcons name="location-city" />}
                  size={4}
                  color={"blue.500"}
                />
                <Text color={"blue.500"} fontWeight="500" pt={1} pl={1}>
                  {item.title}
                </Text>
              </HStack>
            </Heading>
          </_Stack>

          <VStack flex={1}>
            <Text>{item.city}</Text>
            <Text>{item.line1} </Text>
            <Text>{item.line2} </Text>
          </VStack>
          {item.default && (
            <Center
              bg="blue.500"
              _text={{
                color: "warmGray.50",
                fontWeight: "700",
                fontSize: "xs",
              }}
              position="absolute"
              flexDir={"row"}
              right={"0"}
              bottom="0"
              px="3"
              py="1.5"
            >
              <Icon as={<FontAwesome name="home" />} size={4} color={"white"} />
            </Center>
          )}

          <Center
            _text={{
              color: "blue.500",
              fontWeight: "700",
              fontSize: "xs",
            }}
            position="absolute"
            bottom="0"
            px="3"
            py="1.5"
          >
            {item.zip}
          </Center>
        </_Stack>
      </Card>
    </Box>
  );
};

export default CardAddressItem;
