import express from 'express';
import {
    getAllOrders,
    createOrder,
    deleteOrder
} from './order.Controllers.js';

export const ordersRoutes = express.Router() ;

ordersRoutes.post('/orders/:productId', createOrder);           // Create order with product

ordersRoutes.get('/orders', getAllOrders);                     // Get all user orders

//ordersRoutes.put('/orders/:orderId', updateOrder);             // Update order

ordersRoutes.delete('/orders/:orderId', deleteOrder);          // Cancel order

