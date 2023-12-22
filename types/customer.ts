import { type CreatedShort } from "./general";

export interface Customer {
    title: string;
    name: string;
    lastname: string;
    rif: string;
    email: string;
    phone: string;
    created: CreatedShort;
    addresses: Address[];
    _id: string;
}

export interface Address {
    title: string;
    city: string;
    line1: string;
    line2: string;
    zip: string;
    default: boolean;
    created: CreatedShort | null;
    _id: string | null;
}