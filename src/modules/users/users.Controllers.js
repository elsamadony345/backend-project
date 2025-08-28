import { userModel } from "../../../db/models/Users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendMail } from "../../utilities/Email/verifyEmail.js";

export const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json({
      message: "sucess",
      Users: users,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "there is an error", error: error.message });
  }
};
//adding user (register)
export const register = async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 8);
    const newUser = await userModel.insertOne(req.body);
      sendMail(req.body.email);
    newUser.password = undefined;
    res
      .status(201)
      .json({ message: " a new user has been added", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "there is an error", error: error.message });
  }
};

//loging in
export const userLogin = async (req, res) => {
  try {
    const exist = await userModel.findOne({ email: req.body.email });
    if (!exist) return res.json({ message: "this email is not found" });
    const passwordMatched = await bcrypt.compare(
      req.body.password,
      exist.password
    );
    if (!passwordMatched)
      return res.json({ message: "the entered password is wrong" });
    const token = jwt.sign({ _id: exist._id, role: exist.role }, "samadony");
  if(exist.isConfirmed === false) return res.json({message : "please confirm your Email"})
    res.json({ message: `welcome ${exist.userName}`, token });
  } catch (error) {
    res.status(500).json({message : "the is an erro" , err : err.message})
  }
};

//updating user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await userModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(201).json({ message: "user is not found and updated" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "there is an error", error: error.message });
  }
};
//deleting user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      res.status(404).json({ message: "user not found" });
    }
    res.status(201).json({ message: "user has been deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "there is an error", error: error.message });
  }
};

// verifying the email of the user 

export const verifyUserEmail = async (req , res ) => { 
  try{
      const {token} = req.params ;
      const verification = jwt.verify(token , 'samadonyEmail' , async (err , decoded ) => {
        if(err) return res.json({message : "there is an error" , err} ) ;
        const userFound = await userModel.findOne({email : decoded.email } ) ;
    if(!userFound) return res.json({message : "user is not found"}); 

   const verifiedUser = await userModel.findOneAndUpdate({email : decoded.email} , {isConfirmed : true})  ;
    res.json({message:"your email has been verified successfully , please return to log in"} ) ;


      })
    
    

  }catch(err) { 
    res.status(500).json({message :" there is an error" , err : err.message})
  }
}