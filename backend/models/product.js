const mongoose = require('mongoose');
const Product = mongoose.model('Product',{
    name:{type:String},
    price:{type:Number},
    brand:{type:String},
    image:{type:String}
});
module.exports = Product;