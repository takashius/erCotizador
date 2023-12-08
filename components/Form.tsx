import { FormControl, Input, Select } from "native-base";

export const InputForm = ({ data }: { data: any }) => {
  return (
    <FormControl
      {...(data.require && { isRequired: true })}
      isInvalid={`${data.name}` in data.errors}
    >
      <FormControl.Label
        _text={{
          bold: true,
        }}
      >
        {data.title}
      </FormControl.Label>
      <Input
        placeholder={data.placeholder}
        defaultValue={data.value}
        {...(data.keyboardType && { keyboardType: data.keyboardType })}
        onChangeText={(value) =>
          data.setData({ ...data.formData, [data.name]: value })
        }
      />
      {`${data.name}` in data.errors ? (
        <FormControl.ErrorMessage>
          {data.errors[data.name]}
        </FormControl.ErrorMessage>
      ) : (
        <FormControl.HelperText>{data.description}</FormControl.HelperText>
      )}
    </FormControl>
  );
};

export const SelectForm = () => {
  return (
    <FormControl w="full" isRequired>
      <FormControl.Label>Choose service</FormControl.Label>
      <Select
        accessibilityLabel="Choose Service"
        placeholder="Choose Service"
        _selectedItem={{
          bg: "red.600",
        }}
        mt="1"
      >
        <Select.Item label="UX Research" value="ux" />
        <Select.Item label="Web Development" value="web" />
        <Select.Item label="Cross Platform Development" value="cross" />
        <Select.Item label="UI Designing" value="ui" />
        <Select.Item label="Backend Development" value="backend" />
      </Select>
      <FormControl.ErrorMessage>
        Please make a selection!
      </FormControl.ErrorMessage>
    </FormControl>
  );
};
