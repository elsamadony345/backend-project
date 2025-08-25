import mongoose from "mongoose";

const productsShema = new mongoose.Schema({
    title : { 
        type : String , 
        required : true , 
    },
    description : { 
        type :String , 
        required : true , 
    },
    creator : { 
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User"
    }, price : { 
        type : Number , 
        required : true
    }
}, {
    timestamps : true , 
    versionKey : false 
});

export const productsModel = mongoose.model("Product" , productsShema) ;