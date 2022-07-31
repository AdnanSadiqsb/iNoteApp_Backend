const express=require('express')
const router=express.Router()
const { body, validationResult } = require('express-validator');

const fetchUser=require('../middleware/fetchUser.js')
const Notes=require('../models/Notes')
// ROUTE: 1 get all the notes GET "/api/auth/fetchNotes"  Login required
router.get('/fetchAllNotes',fetchUser, async (req,res)=>{

    // try {
        const notes=await Notes.find({user:req.user.id})
        res.json(notes)
    // } catch (error) {
    //     console.log(error.message)
    //     res.status(500).json({error:"some error accured"})
    // }
   
})


// ROUTE: 2 to add notes POST "/api/auth/addNotes"  login required

router.post('/addNotes',fetchUser,[
    body('title','enter valid title').isLength({min:3}),
    body('description','description length must be greater than 5').isLength({min:5}),
], async (req,res)=>{
    try {
        const {title,description, tag}= req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const note=new Notes({
            title,description, tag, user:req.user.id
        })
        const savedNotes=await note.save()
        res.json(savedNotes)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({error:"some error accured"})
    }
   
   

})
module.exports=router