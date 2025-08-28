import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  products: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product', 
      required: true 
  }
}, {
  timestamps: true,
  versionKey : false
});

export const ordersModel = mongoose.model('Order', orderSchema);
