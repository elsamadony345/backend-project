import { productsModel } from "../../../db/models/Products.model.js";

//displaying products for anyone 

export const getProducts =  async ( req ,res )=> {
    try{
        const products = await productsModel.find().populate("creator") ;
    if(!products) return res.json({message : "there are no products" })
        res.status(200).json({
        message : "products has bee retrieved successfully", 
        Products : products
     })
    } catch(err) { 
        res.status(500).res.json({message : "there is an error" , err : err.message})
    }
}

//creating products (only for admins) 

export const createProduct = async (req ,res ) => {
    try{
        const newProduct = await productsModel.insertOne(req.body) ;
        res.json({ message: `the product of title : " ${req.body.title} " is added`, newProduct}) ;

    }catch (err) {
        res.status(500).res.json({message :" there is an error", err : err.message})
    }
}
// updating posts
export const updateProduct = async (req, res ) => {
    try{
        const {id} = req.params ;
        const updatedProduct = await productsModel.findByIdAndUpdate( id , req.body , { 
            new : true 
        })
        if(!updateProduct) return res.json({message : "product is not found"}); 
        res.json({message : `the product of title : " ${updateProduct.title} " has been updated `})
    }catch (err) { 
        res.status(500).json({message: "there is an error " , err : err.message})
    }
}
//deleting posts
export const deleteProduct = async (req ,res) => {
    try{
        const {id} = req.params ; 
        const deletedProduct = await productsModel.findByIdAndDelete(id , req.body) ;
        if(!deleteProduct) return res.status(404).json({message : "the user is not found"}) ; 
         res.json({message : `the product of title : " ${updateProduct.title} " has been deleted `})

    }catch (err) { 
        res.status(500).res.json({message : "there is an erro" , err : err.message})
    }
}