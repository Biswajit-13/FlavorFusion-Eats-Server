const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const bookingsSchema = new Schema({
    username:{type:String, required:true },
    email:{type:String,required:true},
    phone:{type:Number,required:true},
    date:{type:Date,required:true},
    time:{type:String, required:true},
    guests:{type:Number,required:true}
},{
    timestamps:true,
})

const bookings = mongoose.model('Bookings', bookingsSchema);

module.exports = bookings;