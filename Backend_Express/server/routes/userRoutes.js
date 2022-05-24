const express = require('express')
const User = require('../model/userModals')

const userRouter = express.Router()

userRouter.post('/info', async(req,res)=>{
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    await newUser.save().then(()=>{
        res.status(201).json({msg:'Data sent Successful'})
    }).catch((err)=>{
        res.status(401).json({msg: 'Data sent Failed'})
    })
})

userRouter.get('/info', (req,res)=>{
    User.find({}, (err,docs)=>{
        if(docs){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})

userRouter.get('/info/:id', (req,res)=>{
    User.findById({_id: req.params.id}, (err,docs)=>{
        if(docs){
            res.send(docs)
        }else{
            res.status(400).json({msg: 'Data not find from id'})
        }
    })
})

// DELETE DATA
userRouter.post('/info/delete', (req,res)=>{
     User.findByIdAndDelete({_id: req.body.id}, (err,docs)=>{
       if(docs){
           res.send(docs)
       }else{
           res.status(400).json({msg:'User Delete Failed'})
       }
   })
})

// UPDATE DATA
userRouter.put('/info/edit', (req,res)=>{

    const update = {
        name : req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    }
    User.findByIdAndUpdate(req.body.id, update, (err,docs)=>{
        if(docs){
            res.send(docs)
        }else{
            res.status(400).json(err)
        }
    })
})

module.exports = userRouter