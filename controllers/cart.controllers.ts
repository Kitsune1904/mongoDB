import {completeOrder, createOrCompleteCart, deleteProductFromCart} from "../services/cart/cart.services";
import {getProduct} from "../services/products/products.services";
import { Response } from 'express';
import {CustomRequest, ICart} from "../models/models";
import {IProduct} from "../models/products";
import {Checkout} from "../models/orders";

/**
 * Receives a request to add a new product in cart
 * Response by updated cart with new added product
 * @param req
 * @param res
 */
export const addProduct = async (req: CustomRequest, res: Response): Promise<void> => {
    const product: IProduct = await getProduct(req)
    const userId: string|undefined = req.userId;
    const cart: ICart = await createOrCompleteCart(product, userId)
    res.status(201).json(cart);
}
/**
 * Receives a request to delete product from cart by its ID
 * Response by updated cart without deleted product
 * @param req
 * @param res
 */
export const deleteProduct = async (req: CustomRequest, res: Response): Promise<void> => {
    const prodId: number = Number(req.params.id);
    const userId: string = req.userId!;
    const cart: ICart = await deleteProductFromCart(prodId, userId)
    res.status(200).json(cart);
}

/**
 * Receives a request to show user order info by user ID
 * Response by user order info
 * @param req
 * @param res
 */
export const getOrder = async (req: CustomRequest, res: Response): Promise<void> => {
    const userId: string = req.userId!;
    const order: Checkout = await completeOrder(userId)
    res.status(201).json(order)
}