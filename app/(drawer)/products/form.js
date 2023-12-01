import { Stack, useLocalSearchParams } from "expo-router";
import {
  Box,
  VStack,
  HStack,
  Text,
  FormControl,
  Switch,
  Input,
  Button,
} from "native-base";
import { useOptions } from "../../../components/helpers/OptionsScreens";
import { useState } from "react";

export default productForm = () => {
  const [formData, setData] = useState({ iva: false });
  const [errors, setErrors] = useState({});
  const params = useLocalSearchParams();
  const { post } = params;

  const validate = () => {
    if (formData.name === undefined) {
      setErrors({ ...errors, name: "Name is required" });
      return false;
    } else if (formData.name.length < 3) {
      setErrors({ ...errors, name: "Name is too short" });
      return false;
    } else if (formData.price === undefined) {
      setErrors({ ...errors, price: "Price is required" });
      return false;
    } else if (Number(formData.price) <= 0) {
      setErrors({ ...errors, price: "Price incorrect" });
      return false;
    }
    setErrors({});
    return true;
  };

  const onSubmit = () => {
    validate() ? submitForm() : console.log("Validation Failed");
  };

  const submitForm = () => {
    console.log("Correct", formData);
  };

  return (
    <Box bg="white" safeArea flex="1">
      <Stack.Screen
        options={useOptions(
          post == "new" ? "Nuevo Producto" : "Editar Producto",
          true
        )}
      />
      <VStack mx="3">
        <FormControl isRequired isInvalid={"name" in errors}>
          <FormControl.Label
            _text={{
              bold: true,
            }}
          >
            Name
          </FormControl.Label>
          <Input
            placeholder="Product title"
            onChangeText={(value) => setData({ ...formData, name: value })}
          />
          {"name" in errors ? (
            <FormControl.ErrorMessage>{errors.name}</FormControl.ErrorMessage>
          ) : (
            <FormControl.HelperText>
              Name should contain atleast 3 character.
            </FormControl.HelperText>
          )}
        </FormControl>
        <FormControl isInvalid={"description" in errors}>
          <FormControl.Label
            _text={{
              bold: true,
            }}
          >
            Description
          </FormControl.Label>
          <Input
            placeholder="Product description"
            onChangeText={(value) =>
              setData({ ...formData, description: value })
            }
          />
        </FormControl>
        <FormControl isRequired isInvalid={"price" in errors}>
          <FormControl.Label
            _text={{
              bold: true,
            }}
          >
            Price
          </FormControl.Label>
          <Input
            keyboardType="number-pad"
            placeholder="Product price"
            onChangeText={(value) => setData({ ...formData, price: value })}
          />
          {"price" in errors ? (
            <FormControl.ErrorMessage>{errors.price}</FormControl.ErrorMessage>
          ) : (
            <FormControl.HelperText>
              Name should contain atleast 3 character.
            </FormControl.HelperText>
          )}
        </FormControl>
        <HStack alignItems="center" space={4}>
          <Text>Iva</Text>
          <Switch
            size="sm"
            offTrackColor="blue.100"
            onTrackColor="blue.200"
            onThumbColor="blue.500"
            offThumbColor="blue.50"
            onValueChange={() => {
              setData({ ...formData, iva: !formData.iva });
            }}
          />
        </HStack>
        <Button bgColor={"blue.500"} rounded={"3xl"} onPress={onSubmit} mt="5">
          Submit
        </Button>
      </VStack>
    </Box>
  );
};
