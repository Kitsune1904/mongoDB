import {ApiError} from "../../middleware/ErrorApi";
import crypto from "crypto";
import {TProductCSV} from "../../models/models";
import { Request } from 'express';
import {IProduct, Product, ProductDoc} from "../../models/products";
import * as mongoose from "mongoose";


/**
 * Creates new product
 * @param body
 * @return TProductCSV
 */
export const createNewProduct = (body: TProductCSV) : TProductCSV => {
    const { name, description, category, price } = body;
    if(!name || !description || !category || !price ) {
        throw new ApiError(400, 'Missing required fields')
    }
    return {name, description, category, price}
}

export const addProductInStorage = async (body: TProductCSV): Promise<TProductCSV> => {
    const product: TProductCSV = createNewProduct(body)
    const id: number = product.id ?? crypto.randomInt(1000000000);
    const newProd = new Product ({
        id: id,
        title: product.name,
        description: product.description,
        category: product.category,
        price: product.price
    });
    try {
        await newProd.save();
    } catch (err) {
        if(err instanceof mongoose.Error){
            throw new ApiError(402, JSON.stringify(err))
        } else {
            throw new ApiError(500, 'Unknown')
        }
    }
    return product
}

export const getProduct = async (req: Request): Promise<IProduct> => {
    const productId: number = Number(req.params.id);
    if (isNaN(productId)) {
        throw new ApiError(400, 'Wrong id format')
    }
    const currentProduct = (await Product.findOne({id: productId}).exec()) as ProductDoc;
    if (!currentProduct) {
        throw new ApiError(404, 'Product not found')
    }
    return currentProduct.toObject();
}

export const getAllProductsReal = async (): Promise<IProduct[]> => {
    const array: IProduct[] = []
    for await (const doc of Product.find()){
        array.push(doc as IProduct);
    }
    return array;
}


