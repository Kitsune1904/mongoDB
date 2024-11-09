import {TProductCSV} from "../models/models";
import {IProduct, Product, ProductDoc} from "../models/products";
import mongoose from "mongoose";
import {ApiError} from "../middleware/ErrorApi";

export async function insertProduct(proto: IProduct): Promise<void> {
    const newProd = new Product(proto);
    try {
        await newProd.save();
    } catch (err) {
        if(err instanceof mongoose.Error){
            throw new ApiError(400, JSON.stringify(err))
        } else {
            throw new ApiError(500, 'Unknown')
        }
    }
}

export async function findProductByTitle(title: string): Promise<ProductDoc>{
    return (await Product.findOne({title: title}).exec()) as ProductDoc;
}

export async function insertProducts(products: TProductCSV[]): Promise<void> {
    const productDocs: ProductDoc[] = []
    for(const proto of products){
        const product = new Product({
            title: proto.name,
            category: proto.category,
            description: proto.description,
            price: proto.price,
        }) as ProductDoc;
        if(product.validateSync() == null)
            productDocs.push(product);
    }
    await Product.insertMany(productDocs);
}