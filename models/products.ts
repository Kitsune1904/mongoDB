import {HydratedDocument, Model, model, Schema} from 'mongoose';

export interface IProduct {
    id: number;
    title: string;
    description: string;
    category?: string
    price: number;
}

const productSchema = new Schema<IProduct>({
    id: { type: Number },
    category: { type: String },
    title: {
        type: String,
        required: [true, '402||Product title required'],
        validate: [
            {
                validator: function (value: string): boolean {
                    return value.length <= 70
                },
                message: '402||Too long title'
            },
            {
                validator: async function(title: string): Promise<boolean> {
                    const model = this.constructor as Model<any>;
                    const product = await model.findOne({title}).exec();
                    return !product;
                },
                message: '409||Not unique'
            }
        ]
    },
    description: {
        type: String,
        required: [true, '402||Product description required'],
        validate: {
            validator: function (value: string): boolean {
                return value.length <= 256
            },
            message: '402||Too long description'
        }
    },
    price: {
        type: Number,
        required: [true, '402||Product price required'],
    }
})

// noinspection TypeScriptValidateTypes
export const Product = model<IProduct>('Products', productSchema);

export type ProductDoc = HydratedDocument<IProduct>;