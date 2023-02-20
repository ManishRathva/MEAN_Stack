const express = require('express');
const router = express.Router();
const multer = require('multer');
const ObjectId = require('mongoose').Types.ObjectId;
const Product = require('../models/product.js');
const directory = './images';

//get post put delete
//base path:http://localhost:5000/product

const storage = multer.diskStorage({
    destination: (req ,file , cb) => {
        cb(null , directory)
    },
    filename: (req , file ,cb) => {
        const filename = file.originalname.toLowerCase().split(' ').join('-')
        cb(null , filename)
    }
})
var upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5,
    },
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype == 'image/png' ||
        file.mimetype == 'image/jpg' ||
        file.mimetype == 'image/jpeg'
      ) {
        cb(null, true)
      } else {
        cb(null, false)
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
      }
    },
  })


//get API
router.get('/',(req,res)=>{
 Product.find((err,doc)=>{
    if(err){
     console.log('eroor in get data'+err);
    }else{
     res.send(doc);
    }
  })
})
//get single API
router.get('/:id',(req,res)=>{
if(ObjectId.isValid(req.params.id)){
 Product.findById(req.params.id,(err,doc)=>{
    if(err){
        console.log('eroor in single data get'+err);
       }else{
        res.send(doc);
       }
    })
}else{
return res.status(400).send('not found data'+req.params.id)
}
});

 //Delete API 
 router.delete('/:id',(req,res)=>{
    if(ObjectId.isValid(req.params.id)){
     Product.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(err){
            console.log('Error in delete data'+err);
           }else{
            res.send(doc);
           }
        })
    }else{
        return res.status(400).send('not found data'+req.params.id)
    }
    });
    
//put API 
router.put('/:id',upload.single('image'),(req,res)=>{
    const url = req.protocol + '://' + req.get('host');
    if(ObjectId.isValid(req.params.id)){
        let p = ({
            name:req.body.name,
            price:req.body.price,
            brand:req.body.brand,
            image: url+ '/images/'+ req.file.filename
        
        })
     Product.findByIdAndUpdate(req.params.id,{$set:p},{new:true},(err,doc)=>{
        if(err){
            console.log('Error in update data'+err);
           }else{
            res.send(doc);
           }
        })
    }else{
        return res.status(400).send('not found data'+req.params.id)
    }
    });
//post API 
router.post('/',upload.single('image'),(req,res)=>{
 const url = req.protocol + '://'+ req.get('host');  
    let p = new Product({
        name:req.body.name,
        price:req.body.price,
        brand:req.body.brand,
        image: url+ '/images/'+ req.file.filename
    })
    p.save((err,doc)=>{
        if(err){
         console.log('error in post data'+err);
        }else{
         res.send(doc);
        }
    })
})

module.exports = router;