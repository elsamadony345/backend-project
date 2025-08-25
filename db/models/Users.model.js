import mongoose from "mongoose"; 

const userSchema = new mongoose.Schema({
    userName : {
        type : String ,
        required : true ,
    },
    email : { 
        type : String ,
        required : true , 
        unique : true
    }, 
    password : { 
        type : String , 
        required : true ,
    }, 
    age : Number , 
    isAdmin : {
        type : Boolean ,
        required : true ,
        default : false 
    }, isConfirmed : { 
        type : Boolean , 
        default : false 
    },role : { 
        type : String , 
        default : "user",
        enum : ["user" , "admin" ]
    }

},{
        timestamps : true ,
        versionKey : false
    })

export const userModel = mongoose.model("User" ,userSchema)