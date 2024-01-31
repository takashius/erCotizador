import { t } from "i18next";
import {
  FormControl,
  Input,
  Text,
  WarningOutlineIcon,
  Box,
} from "native-base";
import { Platform, TouchableWithoutFeedback } from "react-native";
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';

export const InputForm = ({ data }: { data: any }) => {
  return (
    <FormControl
      w={data.col === true ? "1/2" : "full"}
      px={data.col === true ? "2" : 0}
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
        isReadOnly={data.readonly}
        onTouchStart={data.onItemClick}
        {...(data.readonly && { value: data.value })}
        {...(data.keyboardType && { keyboardType: data.keyboardType })}
        onChangeText={(value) =>
          data.setData({ ...data.formData, [data.name]: value })
        }
      />
      {`${data.name}` in data.errors ? (
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {data.errors[data.name]}
        </FormControl.ErrorMessage>
      ) : (
        <FormControl.HelperText>{data.description}</FormControl.HelperText>
      )}
    </FormControl>
  );
};

export const InputDate = ({ data }: { data: any }) => {

  return (
    <TouchableWithoutFeedback onPress={data.onItemClick}>
      <FormControl
        w={data.col === true ? "1/2" : "full"}
        px={data.col === true ? "2" : 0}
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

        <Box
          borderColor={'#d4d4d4'}
          borderWidth={1}
          borderRadius={'5'}
          height={Platform.OS == 'ios' ? "1/3" : "12"}
          padding={"2"}
        >
          <Text>{data.value ? data.value : t("cotiza.placeholder.date")}</Text>
        </Box>
        {`${data.name}` in data.errors ? (
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {data.errors[data.name]}
          </FormControl.ErrorMessage>
        ) : (
          <FormControl.HelperText>{data.description}</FormControl.HelperText>
        )}
      </FormControl>
    </TouchableWithoutFeedback>
  )
}

export const SelectForm = (dataObj: any) => {
  const { data } = dataObj;
  return (
    <FormControl
      w={data.col === true ? "1/2" : "full"}
      px={data.col === true ? "2" : 0}
      {...(data.require && { isRequired: true })}
    // isInvalid={`${data.name}` in data.errors}
    >
      <FormControl.Label
        _text={{
          bold: true,
        }}
      >
        {data.title}
      </FormControl.Label>
      <AutocompleteDropdown
        clearOnFocus={true}
        closeOnBlur={true}
        closeOnSubmit={true}
        direction="up"
        ignoreAccents={true}
        initialValue={{ id: '2' }}
        onSelectItem={(value) => {
          data.setData({ ...data.formData, [data.name]: value?.id })
        }}
        dataSet={data.selectData}
        inputContainerStyle={{
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: '#d4d4d4',
          borderRadius: 5
        }}
        textInputProps={{
          placeholder: data.placeholder,
          placeholderTextColor: '#a3a3a3',
          autoCorrect: false,
          autoCapitalize: 'none',
          style: {
            color: '#a3a3a3',
            paddingLeft: 14,
            fontSize: 13
          }
        }}
        inputHeight={32}
      />
      {`${data.name}` in data.errors ? (
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {data.errors[data.name]}
        </FormControl.ErrorMessage>
      ) : (
        <FormControl.HelperText>{data.description}</FormControl.HelperText>
      )}
    </FormControl>
  )
};
