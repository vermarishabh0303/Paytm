const express = require("express");
const zod = require("zod");
const JWT_SECRET = require("../config");
const jwt = require("jsonwebtoken");
const router = express.Router();

const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
})

router.post("/signin", (res, rej)=>{
    const body = req.body;
    const {success} = signupSchema.safeParse(req.body);

    if(!success){
        return res.json({
            message: "Email already taken/ Incorrect inputs"
        })
    }
    const existingUser = User.findOne({
        username: body.username
    })

    if(!existingUser){
        return res.json({
            message: "User does not exists"
        })
    }


    return res.json({
        message: "User creater successfully",
        token: token
    })
})

router.post("/signup", (res, rej)=>{
    const body = req.body;
    const {success} = signupSchema.safeParse(req.body);

    if(!success){
        return res.json({
            message: "Email already taken/ Incorrect inputs"
        })
    }
    const existingUser = User.findOne({
        username: body.username
    })

    if(existingUser){
        return res.json({
            message: "Email already taken/ Incorrect inputs"
        })
    }

    const user =  await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });
    const userId = user._id;
    const token = jwt.sign({
        userId
    },JWT_SECRET) ;


    return res.json({
        message: "User creater successfully",
        token: token
    })
})


module.exports = router;