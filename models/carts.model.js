const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    title:{type:String, required:true },
    description:{type:String,required:true},
    price:{type:Number,required:true},
    quantity:{type:Number,required:true},
    email:{type:String,required:true},
    image: { type: String }
},{
    timestamps:true,
})

const carts = mongoose.model('carts', cartSchema);

module.exports = carts;