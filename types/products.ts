import { type CreatedShort } from "./general";

export interface ProductForm {
    name: string;
    description: string;
    price: number;
    iva: boolean;
    id: string;
    amount?: number;
    master?: string;
}

export interface ProductCotiza {
    master: string;
    name: string;
    description: string;
    price: number;
    iva: boolean;
    id: string;
    amount?: number;
}

export interface Product extends ProductForm {
    created: CreatedShort;
    _id: string;
}