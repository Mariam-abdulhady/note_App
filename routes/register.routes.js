const app = require('express').Router()
const { validationResult } = require('express-validator')
const validation = require('../validation/register.validation')
const userModel = require('../models/users.model')
const bcrypt = require('bcrypt');
// app.get(' /register.ejs', (req, res) => {
//     // console.log(req.flash('exists'));
//     res.render('register.ejs', { errors: req.flash('errors'), oldInputs: req.flash('oldInputs')[0], exists: req.flash('exists'), isLoggedIn: false })
// })

app.post('/SignUp', validation, async(req, res) => {
    // console.log(req.body);
    const { name, email, password, confirmPassword } = req.body
    const errors = validationResult(req)

    if (errors.isEmpty()) {
        //insert into db
        let user = await userModel.findOne({ email })
        if (user) {
           res.json({message:"email exists"})
        } else {

            bcrypt.hash(password, 7, async function(err, hash) {
                await userModel.insertMany({ name, email, password: hash })
                res.json({message:"success"})
            });

        }

    } else {

        
        res.json({'errors':errors.array()})
       

    }
});

module.exports = app