import express from "express"
import { addProduct, listProducts , removeProduct, singleProduct } from "../controllers/productController.js"

const productRouter = express.Router();

productRouter.post('/add',addProduct);
productRouter.post('/remove',removeProduct);
productRouter.post('/list',listProducts);
productRouter.post('/single',singleProduct);

export default productRouter;