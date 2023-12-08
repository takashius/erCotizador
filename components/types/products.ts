import { type CreatedShort } from "./general";

export interface ProductForm {
    name: string;
    description: string;
    price: number;
    iva: boolean;
    _id: string;
}

export interface Product extends ProductForm {
    created: CreatedShort;
}