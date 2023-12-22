import { Dispatch, SetStateAction } from "react";
import { GestureResponderEvent } from "react-native/Libraries/Types/CoreEventTypes";
import { type Address } from "./customer";

export interface CustomerShort {
    _id: string;
    name: string;
    lastname: string;
}

export interface CreatedShort {
    date: string;
}

export interface MenuItem {
    title: string;
    onPress: (event: GestureResponderEvent) => void;
    isDisabled: boolean;
}

export interface AddressFormProps  {
    post: string;
    params: any;
    errors: Object;
    setErrors: Dispatch<SetStateAction<Object>>;
    formData: Address;
    setData: Dispatch<SetStateAction<Address>>;
}