const app = require('express').Router()
const userModel = require('../models/users.model')
const jwt=require('jsonwebtoken')
app.post('/login', async(req, res) => {

    const { email, password } = req.body
    let user = await userModel.findOne({ email })
    if (user) {
        //password
        const match = await bcrypt.compare(password, user.password);

        if (match) {
           let token=jwt.sign({userID:user._id,role:"user"},'mariam')
          res.json({token})

        } else {
          res.json({message:"password 8lt"})
                //feedback password 8lt
        }
    } else {


        //feedback message
      res.json({message:"email doesnt exist"})

    }
});

module.exports = app