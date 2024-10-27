import {IProduct, Product} from "../../models/products";
import {products} from "../../repository/storage";

export async function importPredefined () :Promise<void> {
    const prod: IProduct[] = [...products];
    for(let i = 0; i < products.length; i++){
        const product = new Product({
            id: prod[i].id,
            title: prod[i].title,
            description: prod[i].description,
            price: prod[i].price,
        })
        try {
            await product.save()
        } catch (err){

        }
    }
}