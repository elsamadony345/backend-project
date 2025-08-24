import express from "express" 
import {getUsers,
    register,
    updateUser,
    deleteUser,
    userLogin
} from "./users.Controllers.js"
import { checkEmail } from "../../middlewares/checkEmail.js";
export const userRoutes =  express.Router()

userRoutes.get("/users" , getUsers) ;

userRoutes.post("/users/register", checkEmail, register) ;

userRoutes.put("/users/:id" , updateUser) ;

userRoutes.post("/users/login" , userLogin)

userRoutes.delete("/user/:id" , deleteUser) ; 