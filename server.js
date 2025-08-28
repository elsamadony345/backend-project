
import express from "express" ;
import { dbConnection } from "./db/dbConnection.js";
import { userRoutes } from "./src/modules/users/user.Routes.js";
import { productsRoutes } from "./src/modules/products/products.Routes.js";
import { sendMail } from "./src/utilities/Email/verifyEmail.js";
import { cartRoutes } from "./src/modules/carts/cart.Routes.js";
import { ordersRoutes } from "./src/modules/orders/order.Routes.js";
const app = express() ;

app.use(express.json());

//sendMail()

app.use(userRoutes);

app.use(productsRoutes) ;

app.use(cartRoutes) ;

app.use(ordersRoutes);

app.listen(3000 , () => {
    console.log("the server is up and running")
})
