import React from "react";
import {
  Box,
  HStack,
  Text,
  Center,
  Stack as _Stack,
  Heading,
  Icon,
} from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { type Cotiza } from "../types/cotiza";
import { FormatDate } from "./helpers/Utils";

const CardCotizaItem = ({ item }: { item: Cotiza }) => {
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
        <_Stack p="4" space={2}>
          <_Stack space={2}>
            <Heading size="md" ml="-1" color={"blue.500"}>
              {item.title}
            </Heading>
            <Text
              fontSize="xs"
              _light={{
                color: "blue.300",
              }}
              _dark={{
                color: "blue.200",
              }}
              fontWeight="500"
              ml="-0.5"
              mt="-1"
            >
              {item.description}
            </Text>
          </_Stack>
          <Text fontWeight="400">
            {item.customer.name} {item.customer.lastname}
          </Text>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Text
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
                fontWeight="400"
              >
                {FormatDate(item.created.date)}
              </Text>
            </HStack>
          </HStack>
          <Center
            bg="blue.500"
            _dark={{
              bg: "blue.400",
            }}
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
            <Icon as={<FontAwesome name="dollar" />} size={4} color={"white"} />
            {item.amount}
          </Center>
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
            {item.status.toUpperCase()}
          </Center>
        </_Stack>
      </Box>
    </Box>
  );
};

export default CardCotizaItem;
