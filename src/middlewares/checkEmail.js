import { userModel } from "../../db/models/Users.model.js";


export const checkEmail = async ( req, res , next) => { 

     const exist = await userModel.findOne({email : req.body.email}) ;

    if(exist) return res.status(409).json({message : "user is already registered , please login"}) ;
        next()
}