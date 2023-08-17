const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  order: { type: Object, required: true },
  email: { type: String, required: true },
  isConfirmed:{type:Boolean, default:false},
  isOutForDelivery:{type:Boolean, default:false},
  isDelivered:{type:Boolean, default:false},
  totalPrice:{type:Number,required:true}
},{
  timestamps:true,
})

module.exports = mongoose.model('orders', orderSchema)