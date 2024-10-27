import crypto from "crypto";
import bcrypt from "bcrypt";
import {ApiError} from "../../middleware/ErrorApi.js";
import jwt from 'jsonwebtoken'
import {JWT_KEY} from "../../constants";
import {IUser, User} from "../../models/users";
import * as mongoose from "mongoose";


export const signupNewUser = async (newUser: IUser): Promise<IUser> => {
    const hashedPassword: string = await bcrypt.hash(newUser.password as string, 10) ;
    const user = new User({
        id: crypto.randomUUID(),
        name: newUser.name,
        email: newUser.email,
        role: 'CUSTOMER',
        password: hashedPassword,
        cart: []
    });
    try {
        await user.save()
    }
    catch(e){
        if(e instanceof mongoose.Error)
            throw new ApiError(402, JSON.stringify(e))
        else
            throw new ApiError(500, 'Unknown')
    }
    return user.toObject()
}

export const loginUser = async (email: string, password: string) => {
    const currentUser = (await User.findOne({email: email}).exec()) as IUser;
    if (!currentUser) {
        throw new ApiError(404, `User ${email} doesn\'t exist`)
    }
    const match = await bcrypt.compare(password, currentUser.password);
    if(!match) {
        throw new ApiError(401, `Invalid password`)
    }
    return jwt.sign({ role: currentUser.role }, JWT_KEY, { expiresIn: '1h' })
}

