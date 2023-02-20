const mongoose = require('mongoose');
mongoose.set('strictQuery',true);
mongoose.connect('mongodb://127.0.0.1:27017/myDB',(err)=>{
    if(!err){
        console.log("Connect Mongodb Database");
    }else{
        console.log(err);
    }
})
module.exports = mongoose;