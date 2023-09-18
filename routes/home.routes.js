const app = require('express').Router()
const noteModel = require('../models/note.model')
const jwt=require('jsonwebtoken')
const auth=require('../middelware/auth')
app.get('/home',async(req, res) => {
    let userID=req.header('userID')
    let token=req.header('token')
    jwt.verify(token,'mariam',async(err,decoded)=>{
        if(err){
            res.json({err})
        }else{
            let notes = await noteModel.find({ userID })
            res.json(notes)
}
    })
  
})

app.post('/addNote',auth, async(req, res) => {
    console.log(req.body);
    const { title, desc } = req.body
try{
    await noteModel.insertMany({ userID:req.userID, title, desc })
    res.json({message:"success"})
}catch(error){
    res.json({error})
}
     
    

})
  


app.delete('/delete', async(req, res) => {
    console.log(req.body);
    const { _id } = req.body
    await noteModel.findOneAndDelete({ _id })
    res.json({message:"deleted"})
});
app.put('/editeNote',auth,async(req,res)=>{
    const{_id,title,desc}=req.body
  try{
    await noteModel.findoneAndUPdate({_id},{title,desc})
    res.json({message:"updated"})

  }
  catch(error){
    res.json({error})
  }
})


module.exports = app