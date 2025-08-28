import { getCart, 
    addToCart, 
    updateCart,
    deleteFromCart
 } from "./carts.Controllers.js";
 import express from "express"

export const cartRoutes = express.Router() ; 


cartRoutes.get("/cart" , getCart) ; 

cartRoutes.post("/cart/:productId" , addToCart) ;

cartRoutes.put("/cart/:productId" ,updateCart) ; 

cartRoutes.delete("/cart/:productId", deleteFromCart) ;
