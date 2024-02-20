import { CustomerBase } from "./customer";
import { type CustomerShort, type CreatedShort } from "./general";
import { ProductForm } from "./products";

export interface CotizaForm {
    title: string;
    description: string;
    number: number;
    date: string;
    customer: string;
    id?: string;
    customerId?: string;
}

export interface CotizaBase {
    title: string;
    description: string;
    status: string;
    number: number;
    amount: number;
    date: string;
    rate: number;
    discount: number;
    typeDiscount: string;
    created: CreatedShort;
    _id: string;
}

export interface Cotiza extends CotizaBase {
    customer: CustomerShort;
}

export interface CotizaFull extends CotizaBase {
    customer?: CustomerBase;
    products?: ProductForm[];
}