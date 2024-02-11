import { Dispatch, SetStateAction } from "react";
import { GestureResponderEvent } from "react-native/Libraries/Types/CoreEventTypes";
import { type CustomerForm, type Address } from "./customer";
import { ProductForm } from "./products";
import { UseQueryResult } from "@tanstack/react-query";

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

export interface FormProps {
    post: string;
    params: any;
    errors: Object;
    setErrors: Dispatch<SetStateAction<Object>>;
}

export interface AddressFormProps extends FormProps {
    formData: Address;
    setData: Dispatch<SetStateAction<Address>>;
}

export interface ProductsFormProps extends FormProps {
    formData: ProductForm;
    productList: UseQueryResult<ProductForm[], Error>;
    setData: Dispatch<SetStateAction<ProductForm>>;
}

export interface CustomerFormProps {
    post: string | string[];
    params: any;
    errors: Object;
    setErrors: Dispatch<SetStateAction<Object>>;
    formData: CustomerForm;
    setData: Dispatch<SetStateAction<CustomerForm>>;
    onSubmit: (event: GestureResponderEvent) => void;
}

export interface ModalProps {
    post: string;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    setSubmit: Dispatch<SetStateAction<boolean>>;
}

export interface ModalAddressProps extends ModalProps {
    idCustomer: string;
    params?: Address;
}

export interface ModalProductProps extends ModalProps {
    idCotiza: string;
    params?: ProductForm;
}

export interface Select {
    id: string;
    title: string;
}