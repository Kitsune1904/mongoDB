import { Request } from 'express';
import {IProduct} from "./products";

export interface ICart {
    id: string;
    userId: string;
    products: IProduct[];
}

export type TProductCSV = {
    id?: number
    name: string;
    description: string;
    category: string;
    price: number;
}

export interface IToken {
    role: string
}

export type CustomRequest = Request & {
    userId?: string;
    user?: IToken;
};


