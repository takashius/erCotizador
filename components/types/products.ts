import { type CreatedShort } from "./general";

export interface Product {
    name: string;
    description: string;
    price: number;
    iva: boolean;
    created: CreatedShort;
    _id: string;
}