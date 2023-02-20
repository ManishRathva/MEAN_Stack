const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('./db.js');
const routes = require('./routes/routes.js')
const multer = require('multer')

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/images' , express.static('images'));
app.use(cors({origin:'http://localhost:4200'}));

app.use('/product',routes);
app.listen(5000,()=>console.log('server started at port:5000'));


