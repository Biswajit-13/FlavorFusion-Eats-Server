const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = process.env.ATLAS_URI;
mongoose.connect(uri
)
const connection = mongoose.connection;
connection.once('open',() =>{
    console.log("MongoDB database connected")
})

const bookingsRouter = require('./routes/bookings')
const authRouter = require('./routes/auth');
const cartRouter = require('./routes/carts');
const orderRouter = require('./routes/orders')

app.use('/bookings',bookingsRouter)
app.use('/auth', authRouter);
app.use('/cart',cartRouter);
app.use('/orders',orderRouter);

app.listen(port,()=> {
    console.log(`Server running on port:${port}`);
})