import { Router } from 'express';
import {addProduct, deleteProduct, getOrder} from "../controllers/cart.controllers";

const cartRouter: Router = Router();

cartRouter.put('/:id', addProduct);

cartRouter.delete('/:id', deleteProduct)

cartRouter.post('/checkout', getOrder)

export default cartRouter