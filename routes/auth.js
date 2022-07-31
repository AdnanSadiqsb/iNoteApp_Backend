const express=require('express')
const router=express.Router()
const User=require('../models/User')
const { body, validationResult } = require('express-validator');
const JWT=require('jsonwebtoken')
const  bcrypt=require('bcryptjs')
const JWT_SECTRET='sectretetoken'



// create a user using: POST "/api/auth/createUser" Does not require login
router.post('/createUser',
    body('name','enter valid name').isLength({min:5}),
    body('email','enter valid Email Address').isEmail(),
    body('password','password lenght mut be greater then 5').isLength({ min: 5 })
    
,
    async (req,res)=>{
        // if there are errors then return the bad request with errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        try{
            
            
            // check if user exist alredy with same email
            let newuser =await User.findOne({email:req.body.email})
            
            if(newuser)
            {
                // if user whith same email exist then returm error message
                return res.status(400).json({error:"sorry a user with this email is already exist"})
            }
            const salt=await bcrypt.genSalt(10);

            let secPass=await bcrypt.hash(req.body.password,salt)
            newuser=await User.create({
                name: req.body.name,
                password: secPass,
                email:req.body.email,
            })
            const data={
                user:{id:newuser.id}
                
            }
            console.log(newuser.id)
            const authToken=JWT.sign(data,JWT_SECTRET);
            console.log(authToken)

            res.json({authToken:authToken})  
        }
        catch(error){
            console.log(error.message)
            res.status(500).json({error:"some error accured"})
        }
    })


module.exports=router