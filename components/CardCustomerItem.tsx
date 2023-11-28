import React from "react";
import {
  Box,
  HStack,
  Text,
  Icon,
  Stack as _Stack,
  Heading,
  VStack,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

const CardCustomerItem = (params: any) => {
  return (
    <Box alignItems="center" marginBottom={5}>
      <Box
        maxW="80"
        w={"80"}
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        _dark={{
          borderColor: "coolGray.600",
          backgroundColor: "gray.700",
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: "gray.50",
        }}
      >
        <_Stack p="4" space={0}>
          <_Stack space={2}>
            <Heading size="md" ml="-1" color={"blue.500"}>
              Cliente titulo
            </Heading>
          </_Stack>
          <HStack space={3} justifyContent="left">
            <VStack flex={1}>
              <Text>Juan de los Palotes</Text>
              <HStack>
                <Icon
                  marginTop={1}
                  as={<MaterialIcons name="phone" />}
                  size={4}
                  color={"blue.500"}
                />
                <Text> 08342387</Text>
              </HStack>
            </VStack>
            <VStack flex={1} alignItems={"flex-end"}>
              <Text>Rif: J-000000-0</Text>
              <HStack>
                <Icon
                  marginTop={1}
                  as={<MaterialIcons name="location-city" />}
                  size={4}
                  color={"blue.500"}
                />
                <Text> 2</Text>
              </HStack>
            </VStack>
          </HStack>
        </_Stack>
      </Box>
    </Box>
  );
};

export default CardCustomerItem;
