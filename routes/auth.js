const express=require('express')
const router=express.Router()
const User=require('../models/User')


// create a user using: POST "/api/auth/" Does not require auth
router.post('/',(req,res)=>{
   console.log(req.body)
    const user=User(req.body)
    user.save()

    res.send("hlo")
})

module.exports=router