import dotenv from 'dotenv'

if(process.env.NODE_ENV == "local"){
    dotenv.config({ path: './env/.env.development' });
}

export const PORT: number = Number(process.env.PORT) || 5000;
export const LOG_FILE: string = process.env.LOG_FILE || './logs/productsUpload.dev.log';

export const JWT_KEY: string = process.env.JWT_KEY || 'secret'


export const ADMIN_NAME: string = process.env.ADMIN_NAME || 'secret';
export const ADMIN_EMAIL: string = process.env.ADMIN_EMAIL || 'secret';
export const ADMIN_PASSWORD: string = process.env.ADMIN_PASSWORD || 'secret';
export const MONGO: string = process.env.MONGO || 'mongodb+srv://annanorri992:zmY3cdivliOZjnKq@cluster0.8e0gg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';