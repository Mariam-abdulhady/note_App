const{check}=require('express-validator')
module.exports= //thierd step to validator 
[
 check('firstName').matches(/^[A-Za-z]+([\ A-Za-z-]+)*$/),
 check('lastName').matches(/^[A-Za-z]+([\ A-Za-z-]+)*$/), 
 check('email').isEmail(),
 check('password').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
 //chek on confirmpassword if equal passwod or no
 check('confirmPassword').custom((value, { req }) => {
   if (value !== req.body.password) {
     return false
   }
   // Indicates the success of this synchronous custom validator
   return true;
 }),
]