import bcrypt from "bcrypt";
import {ADMIN_EMAIL, ADMIN_NAME, ADMIN_PASSWORD} from "../../constants";
import {IUser, User} from "../../models/users";

export const generateAdmin = async (): Promise<void> => {
    const admin = await User.findOne({email: ADMIN_EMAIL}).exec() as IUser;
    if (!admin) {
        const adminName: string = ADMIN_NAME;
        const adminEmail: string = ADMIN_EMAIL;
        const adminPassword: string = ADMIN_PASSWORD;

        if (adminName && adminEmail && adminPassword) {
            bcrypt.hash(adminPassword, 12).then((hashedPassword: string): void => {
                User.create({
                    name: adminName,
                    email: adminEmail,
                    password: hashedPassword,
                    role: "ADMIN",
                    cart: []
                }).then(() => console.log('Admin created'))
            });
        } else {
            console.error('Error creating admin')
        }
    } else {
        console.log('Admin user already exists');
    }
}
