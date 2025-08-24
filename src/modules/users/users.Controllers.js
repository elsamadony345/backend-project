import { userModel } from "../../../db/models/Users.model.js";
import bcrypt from "bcrypt" ;

export const getUsers = async (req , res )  => {
    try { 
        const users = await userModel.find() ; 
        res.status(200).json({
            message : "sucess" ,
            Posts : users,
        })
    }catch (error) {
        res.status(500).json({message : "there is an error" , error : error.message});
    }
}
//adding user (register)
export const register = async (req , res) => {
    try{  

        req.body.password = await bcrypt.hash(req.body.password , 8)
        const newUser = await userModel.insertOne(req.body) ;
        newUser.password = undefined ;
        res.status(201).json({message : " a new user has been added" , user : newUser} )
    }catch(error) { 
        res.status(500).json({message : "there is an error" , error : error.message})
    }
}

//loging in 
export const userLogin = async ( req ,res ) => {
    try{
        const exist = await userModel.findOne({email : req.body.email}) ;
        if(!exist) return res.json({message : "this email is not found"}) ;
        const passwordMatched = await bcrypt.compare(req.body.password , exist.password) ; 
        if(!passwordMatched) return res.json({message : "the entered password is wrong"}) ;
        
        res.json({message : `welcome ${exist.userName}`})

    }catch(error){

    }
}

//updating user 
export const updateUser = async (req, res) => { 
    try{
        const {id} = req.params ;
        const updatedeUser = await userModel.findByIdAndUpdate (id , req.body, {
            new : true 
        })
        if (!updatedUser) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(201).json({message : "user is not found"})

    }catch(error) { 
        res.status(500).json({message : "there is an error", error : error.message})
    }
}
//deleting user 
export const deleteUser = async (req,res) => { 
    try{ 
        const {id} = req.params ; 
        const deleteduser = await userModel.findByIdAndDelete (id);
        if(!deletedUser){
            res.status(404).json({message : "user not found"});
        }
        res.status(201).json({message : "user has been deleted"});

    }catch(error){ 
        res.status(500).json({message : "there is an error", error : error.message});
    }
}
