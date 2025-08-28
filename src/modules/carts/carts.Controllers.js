import jwt from "jsonwebtoken" ;
import { cartsModel } from "../../../db/models/Carts.model.js";



export const getCart = async (req ,res ) => { 
    
    try{
        jwt.verify(req.headers.token , 'samadony' , async (err , decoded) =>{
        if(err) return res.json({message : "there is an error" , err}) ;
    const cart = await cartsModel.find({owner : decoded._id}).populate("purchasedItem") ;
    if(!cart) return res.json({message : "your cart is empty"}) ;
    res.json({message : "here is your cart " , cart});
    })
    }catch(err) { 
        res.status(500).json({message : " there is an error" , err : err.message} ) ;
    }
    
} 

export const addToCart =  async (req, res) => {
    try {
   
      const { productId } = req.params; // Get productId from URL params
      
      if (!productId) {
        return res.status(400).json({ message: "Product ID is required" });
      }
   jwt.verify(req.headers.token , 'samadony' , async (err , decoded) =>{
        if(err) return res.json({message : "there is an error" , err}) ;
      // Check if item already exists in cart
      const existingCartItem = await cartsModel.findOne({ 
        owner: decoded._id, 
        purchasedItem: productId 
      });

      if (existingCartItem) {
        // Update quantity if item exists
        existingCartItem.quantity += quantity;
        await existingCartItem.save();
        res.json({ message: "Item quantity updated in cart", cartItem: existingCartItem });
      } else {
        // Create new cart item
        const newCartItem = await cartsModel.insertOne({
          owner: decoded._id,
          purchasedItem: productId
        });
        
        await newCartItem.save();
        res.json({ message: "Item added to cart", cartItem: newCartItem });
      }}) ;
    
    }catch (err) {
        res.status(500).json({message : "there is an error" , err: err.message
        })
    }
}

export const updateCart =  async (req, res) => {
    try{
          const { productId } = req.params; // Get productId from URL params
      const { quantity } = req.body; // Get quantity from body
      
      if (!productId || quantity === undefined) {
        return res.status(400).json({ message: "Product ID and quantity are required" });
      }
        jwt.verify(req.headers.token , 'samadony' , async (err , decoded) =>{
        if(err) return res.json({message : "there is an error" , err}) ;
      if (quantity < 1) {
        // If quantity is less than 1, remove the item from cart
        const deletedItem = await cartsModel.findOneAndDelete({ 
          owner: decoded._id, 
          productId: productId 
        });
        
        if (!deletedItem) {
          return res.status(404).json({ message: "Item not found in cart" });
        }
        
        return res.json({ message: "Item removed from cart due to quantity < 1" });
      }

      // Update the quantity
     
      const updatedItem = await cartsModel.findOneAndUpdate(
        { owner: decoded._id, purchasedItem : productId },
        { quantity: quantity },
        { new: true }
      );

      if (!updatedItem) {
        return res.status(404).json({ message: "Item not found in cart" });
      }

      res.json({ message: "Cart item updated successfully", cartItem: updatedItem });
    });
    }catch (err) {
        res.status(500).json({message : "there is an error" , err: err.message
        })
    }
}


export const deleteFromCart =  async (req, res) => {
    try{
         const { productId } = req.params; // Get productId from URL params
      
      if (!productId) {
        return res.status(400).json({ message: "Product ID is required" });
      }
       jwt.verify(req.headers.token , 'samadony' , async (err , decoded) =>{
        if(err) return res.json({message : "there is an error" , err}) ;
      const deletedItem = await cartsModel.findOneAndDelete({ 
        owner: decoded._id, 
        purchasedItem: productId 
      });

      if (!deletedItem) return res.status(404).json({ message: "Item not found in cart" });
        res.json({ message: "Item deleted from cart successfully" });
      }) ;

      
    }catch (err) {
        res.status(500).json({message : "there is an error" , err: err.message
        })
    }
}