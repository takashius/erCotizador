import { GestureResponderEvent } from "react-native/Libraries/Types/CoreEventTypes";

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