import jwt from 'jsonwebtoken';
import { ordersModel } from '../../../db/models/Orders.model.js';

// CREATE ORDER - Add product from params
export const getAllOrders = async (req, res) => {
  try {
    const orders = await ordersModel.find().populate("customer products")
   res.json({message : "here is all your orders" , orders})
  } catch (err) {
    res.status(500).json({ 
      message: "there is an error", 
      err: err.message 
    });
  }
};

// GET ALL ORDERS (for current user)
export const createOrder = async (req, res) => {
  try {
    const {productId} = req.params ;
    jwt.verify(req.headers.token , 'samadony' , async (err , decoded)=> { 
  if(err) return res.json({message : "there is an erro" , err})
  const addedOrder = await ordersModel.insertOne({products : productId ,
    customer : decoded._id}) ;
  res.json({message : ` the product of id  ${productId} is added`})
    }) 
  } catch (err) {
    res.status(500).json({ 
      message: "there is an error", 
      err: err.message 
    });
  }
};


// DELETE ORDER (Cancel order)
export const deleteOrder = async (req, res) => {
  try{
const {orderId} = req.params ;
   const productOrder = await ordersModel.findOne({_id :orderId }); 
   if(!productOrder) return res.json({message : "this product is not found"})
    const addedOrder = await ordersModel.findOneAndDelete({_id : orderId}) ;
  res.json({message : ` the order of id  ${orderId} is deleted`})
  }
   catch (err) {
    res.status(500).json({ 
      message: "there is an error", 
      err: err.message 
    });
  }}
