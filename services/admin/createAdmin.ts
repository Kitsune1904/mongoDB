import bcrypt from "bcrypt";
import {ADMIN_EMAIL, ADMIN_NAME, ADMIN_PASSWORD} from "../../constants";
import {createUser, findUserByEmail} from "../../repository/users.repo";
import {Role} from "../../models/users";

export const generateAdmin = async (): Promise<void> => {
    const admin = await findUserByEmail(ADMIN_EMAIL);
    if (!admin) {
        const adminName: string = ADMIN_NAME;
        const adminEmail: string = ADMIN_EMAIL;
        const adminPassword: string = ADMIN_PASSWORD;
        if (adminName && adminEmail && adminPassword) {
            bcrypt.hash(adminPassword, 12).then((hashedPassword: string): void => {
                createUser({
                    name: adminName,
                    email: adminEmail,
                    password: hashedPassword,
                    role: Role.ADMIN,
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
