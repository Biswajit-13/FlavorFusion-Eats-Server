const router = require('express').Router();

let Cart = require('../models/carts.model');

router.route('/').get((req, res) => {
    Cart.find()
        .then(carts => res.json(carts))
        .catch(err => res.status(400).json('Error:' + err))
})

//add to cart
router.route('/add').post((req, res) => {
    
    const title = req.body.title;
    const description = req.body.description;
    const price = (req.body.price);
    const quantity = Number(req.body.quantity)
    const email = req.body.email;
    const image = req.body.image;
    const newCart = new Cart({
      title,
      description,
      price,
      quantity,
      email,
      image
    });

    newCart.save()
        .then(() => res.json('Item added to Cart'))
        .catch(err => res.status(400).json('Error:' + err))
})

//update cart
router.route('/update/:id').post((req, res) => {
  const id = req.params.id;
  const { price, quantity } = req.body; // New price and quantity values

  // Construct the update object with only price and quantity fields
  const updateFields = {
      price,
      quantity
  };

  Cart.findByIdAndUpdate(id, updateFields, { new: true })
      .then(updatedCart => {
          if (!updatedCart) {
              return res.status(404).json('Cart not found');
          }
          res.json('Cart updated successfully');
      })
      .catch(err => res.status(400).json('Error: ' + err));
});

//delete to cart
router.route('/delete/:id').delete((req,res)=>{
  Cart.findByIdAndDelete(req.params.id)
  .then(() =>res.json("item deleted from cart"))
  .catch(err => res.status(400).json("Error", + err))
})


module.exports = router;