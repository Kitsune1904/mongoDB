import express, {Express} from 'express';
import cartRouter from "./routes/cartRoutes.js";
import {PORT} from "./constants";
import {login, signUp} from "./controllers/user.controllers.js";
import {errorHandler} from "./middleware/errorHandler.js";
import prodRouter from "./routes/prodRoutes.js";
import './services/admin/createAdmin'
import {auth} from "./middleware/auth";
import cookieParser from 'cookie-parser';
import connectToDB from "./repository/mongo";
import "express-async-errors";
import {generateAdmin} from "./services/admin/createAdmin";
import {importPredefined} from "./services/admin/admin.products";


const app: Express = express();

app.use(express.json());

app.use(cookieParser());


app.post('/api/register', signUp);

app.post('/api/login', login);

app.use('/api/products', auth, prodRouter);

app.use('/api/cart', auth, cartRouter);

app.use(errorHandler);

connectToDB()
    .then(async () => {
        await generateAdmin();
        await importPredefined();
        app.listen(PORT, (): void => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => console.error(err));


