import { MaterialIcons } from "@expo/vector-icons";
import { t } from "i18next";
import {
  FormControl,
  Input,
  Select,
  CheckIcon,
  WarningOutlineIcon,
  Icon,
} from "native-base";
import { useState } from "react";

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

export const SelectForm = (data: any) => {
  const dataTemp = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
    { label: 'Option 4', value: '4' },
    { label: 'Option 5', value: '5' }
  ];
  const [dataRender, setDataRender] = useState(dataTemp);
  const filterData = (search: string) => {
    setDataRender(
      dataTemp.filter(
        (item: any) =>
          item.label.toUpperCase().includes(search.toUpperCase())
      )
    );
  }
  return (
    <FormControl
      w={data.col === true ? "1/2" : "full"}
      px={data.col === true ? "2" : 0}
      {...(data.require && { isRequired: true })}
    // isInvalid={`${data.name}` in data.errors}
    >
      <FormControl.Label>Choose service</FormControl.Label>

      <Select w={'full'} variant="outline"
        minWidth="200"
        accessibilityLabel={"Choose Service"}
        placeholder={"Choose Service"}
        _selectedItem={{ bg: "coolGray.200" }}
        mt={1}
        _actionSheetBody={{
          ListHeaderComponent: <FormControl px={3} mb={3}>
            <Input
              px={15}
              placeholder={t("filter")}
              py={2}
              borderRadius="4"
              fontSize={14}
              // value={searchValue}
              _focus={{ bg: 'white', borderColor: 'darkBlue.600' }}
              type='text'
              onChangeText={(value: string) => {
                filterData(value);
              }}
              InputRightElement={
                <Icon
                  m="2"
                  ml="3"
                  size="6"
                  color="gray.400"
                  as={<MaterialIcons name="search" />}
                />
              }
            />
          </FormControl>
        }}
      >
        <Input
          placeholder="Search"
          variant="filled"
          width="100%"
          borderRadius="10"
          py="1"
          px="2"
          borderWidth="0"
        />
        {(dataRender && dataRender.length) ? dataRender
          .map((item: any) => {
            return (
              <Select.Item
                label={item.label}
                value={item.value}
              />
            )
          }) : ""
        }
      </Select>
      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        Please make a selection!
      </FormControl.ErrorMessage>
    </FormControl>
  );
};
