const router = require('express').Router();


let Booking = require('../models/bookings.model');

router.route('/').get((req, res) => {
    Booking.find()
        .then(bookings => res.json(bookings))
        .catch(err => res.status(400).json('Error:' + err))
})

//add bookings
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const phone = Number(req.body.phone);
    const date = Date.parse(req.body.date)
    const time = (req.body.time)
    const guests = Number(req.body.guests)

    const newBooking = new Booking({
        username,
        email,
        phone,
        date,
        time,
        guests
    });

    newBooking.save()
        .then(() => res.json('Booking Added'))
        .catch(err => res.status(400).json('Error:' + err))
})

//get by Id
router.route('/:id').get((req,res)=>{
    Booking.findById(req.params.id)
    .then(booking =>res.json(booking))
    .catch(err => res.status(400).json("Error", + err))
})

//delete by Id
router.route('delete/:id').delete((req,res)=>{
    Booking.findByIdAndDelete(req.params.id)
    .then(() =>res.json("Booking Deleted"))
    .catch(err => res.status(400).json("Error", + err))
})

//update by Id
router.route('/update/:id').post((req,res)=>{
    Booking.findById(req.params.id)
    .then(booking =>{
         booking.username = req.body.username;
        booking.email = req.body.email;
         booking.phone = Number(req.body.phone);
         booking.date = Date.parse(req.body.date);
         booking.time = (req.body.time);
         booking.guests = Number(req.body.guests);

         booking.save()
         .then(() => res.json('Exercise Updated'))
         .catch(err => res.status(400).json("Error",+err))
    })
    .catch(err => res.status(400).json("Error", + err))
})


module.exports = router;