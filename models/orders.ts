import {IProduct} from "./products";
import {model, Schema} from "mongoose";

export interface IOrder {
    id: string;
    userId: string;
    products: IProduct[];
    totalPrice: number;
}

const orderSchema = new Schema<IOrder>({
    id: { type: String },
    userId: { type: String },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Products'
    }],
    totalPrice: { type: Number }
})

// noinspection TypeScriptValidateTypes
export const Order = model<IOrder>('Orders', orderSchema);

export type Checkout = IOrder & {
    email: string,
    name: string
}