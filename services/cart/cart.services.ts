import crypto from "crypto";
import {ApiError} from "../../middleware/ErrorApi";
import {ICart} from "../../models/models";
import {IProduct, Product, ProductDoc} from "../../models/products";
import {User, UserDoc} from "../../models/users";
import {Checkout, Order, IOrder} from "../../models/orders";

/**
 * Adds product in new or existed user's cart
 * @param product
 * @param userId
 * @return ICart
 */
export const createOrCompleteCart = async (product: IProduct, userId?: string):Promise<ICart> => {
    const currentUser: UserDoc = (await User.findOne({id: userId}).populate('cart').exec()) as UserDoc;
    const currentProduct: ProductDoc = (await Product.findOne({title: product.title}).exec()) as ProductDoc;
    currentUser.cart.push(currentProduct);
    await currentUser.save();
    return {
        id: crypto.randomUUID(),
        userId: userId!,
        products: [...currentUser.cart]
    }
}

/**
 * Delete product from user's cart
 * @param prodId
 * @param userId
 * @return ICart
 */
export const deleteProductFromCart = async (prodId: number, userId?: string): Promise<ICart> => {
    const currentUser: UserDoc = (await User.findOne({id: userId}).populate('cart').exec()) as UserDoc;
    const prodIndex: number = currentUser.cart.findIndex((product: IProduct) : boolean => product.id === prodId);
    if (prodIndex === -1) {
        throw new ApiError(404, 'Product not found in cart')
    }
    currentUser.cart.splice(prodIndex, 1);
    await currentUser.save();
    return {
        id: crypto.randomUUID(),
        userId: userId!,
        products: [...currentUser.cart]
    }
}

/**
 * By user ID take its cart and create an order
 * @param userId
 * @return Checkout
 */
export const completeOrder = async (userId: string): Promise<Checkout> => {
    const currentUser: UserDoc = (await User.findOne({id: userId}).populate('cart').exec()) as UserDoc;
    if (!currentUser || currentUser.cart.length === 0) {
        throw new ApiError(404, 'Cart not found')
    }
    const userOrder  = new Order ({
        id: crypto.randomUUID(),
        userId: userId.toString(),
        products: [...currentUser.cart],
        totalPrice: currentUser.cart.reduce((acc: number, prod: IProduct): number => acc + prod.price, 0)
    })
    currentUser.cart = [];
    await currentUser.save();
    await userOrder.save();
    return {
        ...(userOrder.toObject() as IOrder),
        name: currentUser.name,
        email: currentUser.email
    }
}
