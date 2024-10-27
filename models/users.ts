import {model, Schema, Model, HydratedDocument} from 'mongoose';
import {IProduct} from "./products";

export interface IUser {
    role: "ADMIN" | "CUSTOMER";
    id: string,
    name: string;
    email: string;
    password: string;
    cart: IProduct[]
}

const userSchema = new Schema<IUser>({
    id: {type: String},
    name: {
        type: String,
        required: [true, '402||User name required'],
        validate: new RegExp(/^[a-zA-Z0-9 ]{3,70}$/)
    },
    email: {
        type: String,
        required: [true, '402||User email required'],
        validate: [
            {
                validator: function (email: string): boolean {
                    return new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-z]{2,5}$/).test(email)
                },
                message: '402||Malformed email'
            },
            {
                validator: async function(email: string): Promise<boolean> {
                    const model = this.constructor as Model<any>;
                    const user = await model.findOne({email}).exec();
                    if(!user)
                        return true;
                    return this.id == user.id;
                },
                message: '409||Not unique!'
            }
        ]
    },
    role: {
        type: String,
        required: [true, '402||Role required'],
        validate: function (role: string): boolean {
            return role == 'ADMIN' || role == 'CUSTOMER'
        }
    },
    password: { type: String, required: true },
    cart: [{ type: Schema.Types.ObjectId, ref: 'Products' }]
});

// noinspection TypeScriptValidateTypes
export const User = model<IUser>('Users', userSchema);

export type UserDoc = HydratedDocument<IUser>;
