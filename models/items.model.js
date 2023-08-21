const mongoose = require('mongoose')
const Schema =  mongoose.Schema;

const itemSchema =   new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    
    },
   itemtype:{
    type:String,
    required:true
   },

})

const item = mongoose.model('items', itemSchema);

module.exports = item;