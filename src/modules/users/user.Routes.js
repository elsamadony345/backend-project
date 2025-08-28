import express from "express" 
import {getUsers,
    register,
    updateUser,
    deleteUser,
    userLogin,
    verifyUserEmail
} from "./users.Controllers.js"
import { checkEmail } from "../../middlewares/checkEmail.js";
import { verifyToken } from "../../middlewares/verifyToken.js";
export const userRoutes =  express.Router()

userRoutes.get("/users" , getUsers) ;

userRoutes.post("/users/register", checkEmail, register) ;

userRoutes.put("/users/:id" , updateUser) ;

userRoutes.post("/users/login" , userLogin)

userRoutes.delete("/user/:id" , deleteUser) ; 

// verifying user email

userRoutes.get("/user/verify/:token" , verifyUserEmail) ;