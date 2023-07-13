const express=require("express")
const userRouter=express.Router()
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const {userModel}=require("../model/user.model.js")

userRouter.post("/signup",async(req,res)=>{
    let {email,password}=req.body
    try {
        bcrypt.hash(password,4,async(err,hash)=>{
            if(err){
                res.send({"err":err.message})
            }else{
                const user=new userModel({email,password:hash})
                await user.save()
                res.send({"msg":"User registered"})
            }
        })
    } catch (error) {
        res.send({"msg":error.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const { email, password } = req.body;
    try {
        const user = await userModel.find({ email })
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (result) {
                    let token = jwt.sign({ userID: user[0]._id }, "sumit");
                    res.status(201).send({ "msg": "User Logged in Sucessfull", "token": token })
                } else {
                    res.send({ "msg": "Invalid Credentials" })
                }
            })
        } else {
            res.status(400).send({ "msg": "No user found" })
        }
    } catch (err) {
        res.send({ "err": err.message })
    }
})


module.exports={
    userRouter
}