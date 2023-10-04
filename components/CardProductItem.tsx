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
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

const CardProductItem = (params: any) => {
  const iva = false;
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
              Producto titulo
            </Heading>
          </_Stack>
          <Text>Description</Text>
          <HStack space={3} justifyContent="left">
            <VStack flex={1}>
              <HStack>
                <Icon
                  marginTop={1}
                  as={<FontAwesome name="dollar" />}
                  size={4}
                  color={"blue.500"}
                />
                <Text>08342387</Text>
              </HStack>
            </VStack>
            <VStack flex={1} alignItems={"flex-end"}>
              <HStack>
                <Text>Iva: </Text>
                <Icon
                  marginTop={1}
                  as={
                    <MaterialCommunityIcons
                      name={
                        iva
                          ? "checkbox-marked-circle-outline"
                          : "close-circle-outline"
                      }
                    />
                  }
                  size={4}
                  color={iva ? "blue.500" : "red.300"}
                />
              </HStack>
            </VStack>
          </HStack>
        </_Stack>
      </Box>
    </Box>
  );
};

export default CardProductItem;