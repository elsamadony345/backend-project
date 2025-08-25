import express from "express" ; 
import { getProducts ,
    createProduct ,
    updateProduct,
    deleteProduct
 } from "./products.Controllers.js";
 import { verifyToken } from "../../middlewares/verifyToken.js";

export const productsRoutes = express.Router();


productsRoutes.get("/product", getProducts) ;
productsRoutes.post("/product",verifyToken ,createProduct) ;
productsRoutes.patch('/product/:id' ,verifyToken, updateProduct) ; 
productsRoutes.delete('/product/:id', verifyToken ,deleteProduct) ;

