import { productsModel } from "../../../db/models/Products.model.js";

//displaying products for anyone 

export const getProducts =  async ( req ,res )=> {
    try{
        const products = await productsModel.find().populate("creator", "userName") ; // only returning the userName of the creator
    if(!products) return res.json({message : "there are no products" })
        res.status(200).json({
        message : "products has been retrieved successfully", 
        Products : products
     })
    } catch(err) { 
        res.status(500).res.json({message : "there is an error" , err : err.message})
    }
}

//creating products (only for admins) 

export const createProduct = async (req ,res ) => {
    try{
         req.body.creator = req.decoded._id ;
        const newProduct = await productsModel.insertOne(req.body) ;
       
        res.json({ message: `the product of title : " ${req.body.title} " is added`, newProduct}) ;

    }catch (err) {
        res.status(500).json({message :" there is an error", err : err.message})
    }
}
// updating products

export const updateProduct = async (req, res ) => {
    try{
        const {id} = req.params ;
        const updatedProduct = await productsModel.findOneAndUpdate( {_id : id , creator : req.decoded._id} , updateProduct.title , { 
            new : true 
        })
        if(!updateProduct) return res.json({message : "product is not found"}); 
        res.json({message : `the product of title : " ${updateProduct.title} " has been updated `})
    }catch (err) { 
        res.status(500).json({message: "there is an error " , err : err.message})
    }
}
//deleting products

export const deleteProduct = async (req ,res) => {
    try{
        const {id} = req.params ; 
        const deletedProduct = await productsModel.findOneAndDelete({_id : id  , creator : req.decoded._id } , deletedProduct.title) ;
        if(!deleteProduct) return res.status(404).json({message : "the product is not found"}) ; 
         res.json({message : `the product of title : " ${deleteProduct.title} " has been deleted `})

    }catch (err) { 
        res.status(500).res.json({message : "there is an erro" , err : err.message})
    }
}