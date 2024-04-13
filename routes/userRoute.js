const express = require('express');
const router = express.Router();
const users = require('../model/userModel');
const jwt = require('jsonwebtoken');

router.use(express.json());

//route for Signup

router.post('/', async(req,res)=>{
    try {
        let data = req.body;
        let newUser = await users(data).save();
        console.log(newUser);
        res.status(200).send({message:"Data added"})
    } catch (error) {
        console.log(error);
    }
} )

//route for login

router.post('/login',async (req,res)=>{
    let Username = req.body.Username;
    let Password = req.body.Password;

    const user = await users.findOne({Username:Username});
    if(!user){
        res.json({message:"User not Found"})
    }
    try {
        if(user.Password === Password){
            let payload = {user: Username, pwd: Password}
            let token = jwt.sign(payload, 'employeeapp');

            // res.json({message:"login successfull",user})

            res.send({message:"login successfull", token:token})
        }
        else{
            res.json({message:"incorrect password"})
        }
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;