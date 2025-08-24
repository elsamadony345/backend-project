import mongoose from "mongoose";

const postsShema = new mongoose.Schema({
    title : { 
        type : String , 
        required : true , 
    },
    content : { 
        type :String , 
        required : true , 
    },
    creator : { 
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User"
    }
});

export const postsModel = mongoose.model("Post" , postsShema) ;