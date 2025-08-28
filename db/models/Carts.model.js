import mongoose from "mongoose";

 const cartsSchema = new mongoose.Schema({
    owner : { 
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User"
    } , purchasedItem : { 
        type : mongoose.Schema.Types.ObjectId ,
        ref :"Product"
    } , quantity : {
        type : Number , 
        required : true , 
        default : 1 
    }

 },{
    versionKey : false 
 }) 

 export const cartsModel = mongoose.model('Cart' , cartsSchema) ;