const router = require('express').Router();

const cloudinary = require('cloudinary').v2;
const Item = require('../models/items.model');


          
cloudinary.config({ 
  cloud_name: 'dqel3ij7k', 
  api_key: '124178379298883', 
  api_secret: 'GvT-7ulFPvEl5tS5kL6ivHWm-D8' 
});

//add items
router.route('/add').post(async (req, res) => {
const {title,description,price,image,itemtype} = req.body;

    try {
        // Upload the image to Cloudinary
        const result = await cloudinary.uploader.upload(image, {
          folder:"items",
        });

        // Get the URL of the uploaded image from Cloudinary's response
     

        // Create a new Item instance
        const newItem = new Item({
            title,
            description,
            price,
            image: {
                public_id:result.public_id,
               url:result.secure_url,
            }, 
            itemtype
        });

        await newItem.save();
        res.json('Item Added');
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});


//get items
router.route("/").get((req, res) => {
    Item.find()
        .then(items => res.json(items))
        .catch(err => res.status(400).json('Error:' + err))
})

//update by Id
router.route('/update/:id').post((req,res)=>{
    Item.findById(req.params.id)
    .then(item =>{
         item.title = req.body.title;
        item.description = req.body.description;
         item.price = req.body.price;
         item.image = req.body.image;
         item.itemtype = req.body.itemtype;

         item.save()
         .then(() => res.json('Item updated'))
         .catch(err => res.status(400).json("Error",+err))
    })
    .catch(err => res.status(400).json("Error", + err))
})

//delete by id
router.route('/delete/:id').delete((req,res)=>{
    Item.findByIdAndDelete(req.params.id)
    .then(() =>res.json("Item deleted"))
    .catch(err => res.status(400).json("Error", + err))
})

module.exports = router;

