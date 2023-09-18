const express = require('express')
const app = express()
const port = 3000

//لازم اعمل require ف اى مكان هستخدم فى hash password
const bcrypt = require('bcrypt');
const mongoose  = require('mongoose')
const cors=require('cors')
const path =require('path');
app.use(cors())
app.use(express.json())
app.use(require('./routes/register.routes'))
app.use(require('./routes/login.routes'))
app.use(require('./routes/home.routes'))


//how to connect mongodb with nodejs ?
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/note_App',
    { useNewUrlParser: true, useUnifiedTopology: true},)
    .then(()=>console.log("Connected Successfully"))
    .catch((err)=>{ console.log(err); }) ;
    


app.listen(port, () => console.log(`Example app listening on port port!`))
