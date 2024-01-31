import { type CustomerShort, type CreatedShort } from "./general";

export interface CotizaForm {
    title: string;
    description: string;
    number: number;
    date: string;
    customer: string;
    id?: string;
}

export interface Cotiza {
    title: string;
    description: string;
    status: string;
    number: number;
    amount: number;
    date: string;
    rate: number;
    discount: number;
    typeDiscount: string;
    customer: CustomerShort;
    created: CreatedShort;
    _id: string;
}