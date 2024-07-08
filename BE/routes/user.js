const express = require('express');
const router = express.Router();
const zod = require('zod');
const { User, Account } = require("../db/model");
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require('../middleware/middleware');


const signupSchema = zod.object({
    firstname: zod.string(),
    lastname: zod.string(),
    username: zod.string().email(),
    password:  zod.string().min(6)
})

router.post('/signup', async (req, res) => {
    const {success} = signupSchema.safeParse(req.body)
    // console.log(success)
    // console.log(req.body)
    if(!success){
        res.status(400).json({
            message: 'Invalid data'
        })
    }
    else{
        try{
        
            const existingUser = await User.findOne({username: req.body.username})
            if(existingUser){
                res.status(400).json({
                    message: 'User already exists'
                })
            }else{
                const user = await User.create({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    username: req.body.username,
                    password:  req.body.password
                })
                user.save()
                const userId = user._id

                await Account.create({
                    userId: userId,
                    balance: 1 + Math.random() * 1000
                })

                const token = jwt.sign({userId}, JWT_SECRET)
                res.status(201).json({
                    message: 'User created successfully',
                    token: token
                })
            }
        }catch(err){
            res.status(500).json({
                message: 'Internal server error: ' + err.message
            })
        }
    }
    
})


const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    try{
        const isRegistered = await User.findOne({username: req.body.username, password: req.body.password})
        if(isRegistered){
            const userId = isRegistered._id
            const token = jwt.sign({userId}, JWT_SECRET)
            res.status(200).json({
                message: 'User signed in successfully',
                token: token
            })
        }   
    }
    catch(err){
        res.status(411).json({
            message: 'Invalid username or password' + err.message
        })

    }
})


const updateBody = zod.object({
	password: zod.string().optional(),
    firstname: zod.string().optional(),
    lastname: zod.string().optional(),
})

router.put("/", authMiddleware, async(req, res) =>{
    const {success} = updateBody.safeParse(req.body)
    // console.log(success)
    // console.log(req.body)
    if(!success){
        return res.status(411).json({
            message: "Error while updating information"
        })
    }else{
        try{
            await User.updateOne(req.userId, req.body)
            res.status(200).json({
                message: 'User updated successfully'
            })
        }catch(err){
            res.status(500).json({
                message: 'Internal server error' + err.message
            })
        }
    }
})



router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";
    
    try{
        const users = await User.find({
            $or: [{
                firstname: {
                    "$regex": filter
                }
            }, {
                lastname: {
                    "$regex": filter
                }
            }]
        })
    
        res.json({
            user: users.map(user => ({
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                _id: user._id
            }))
        })
    }catch(error){
        res.status(500).json({
            message: 'Internal server error' + error.message
        })
    }
    
})





module.exports = router