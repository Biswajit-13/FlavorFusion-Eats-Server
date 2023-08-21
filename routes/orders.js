const router = require('express').Router();

let Order = require('../models/orders.model.js');

//get all the orders
router.route('/').get((req, res) => {
    Order.find()
        .then(orders => res.json(orders))
        .catch(err => res.status(400).json('Error:' + err))
})

//get by id
router.route('/:id').get((req,res)=>{
    Order.findById(req.params.id)
    .then(order =>res.json(order))
    .catch(err => res.status(400).json("Error", + err))
})

//place order
router.route('/add').post((req, res) => {
   const {order, email,totalPrice} = req.body;

    const newOrder = new Order({
       order,
       email,
       totalPrice,
    });

    newOrder.save()
        .then(() => res.json('Order Added'))
        .catch(err => res.status(400).json('Error:' + err))
})

//delete
router.route('/delete/:id').delete((req, res) => {
    Order.findByIdAndDelete(req.params.id)
        .then(() => res.json("Order Deleted"))
        .catch(err => res.status(400).json("Error: " + err)) // Change comma to plus sign
});

module.exports = router;