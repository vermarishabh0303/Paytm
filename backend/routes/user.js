const express = require("express");
const zod = require("zod");
const {JWT_SECRET} = require("../config");
const jwt = require("jsonwebtoken");
const router = express.Router();
const {User} = require("../db");
const { authMiddleware } = require("../middleware");

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post("/signin", async(res, rej)=>{
    const {success} = signupSchema.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    const user = await User.findOne({
        username: req.body.username,
        password: req.bodu.password

    })

    if(user){
        const token = jwt.sign({
            userId: user._id
        }, JWT_secret);

        return res.json({
            token: "token"
        })
    }


    return res.status(411).json({
        message: "Error signing in"
    })
})


const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
})
router.post("/signup", async(res, rej)=>{
    const body = req.body;
    const {success} = signupSchema.safeParse(req.body);

    if(!success){
        return res.json({
            message: "Email already taken/ Incorrect inputs"
        })
    }
    const existingUser = await User.findOne({
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

const updateSchema = zod.object({
    password: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string()
})

router.put('/', authMiddleware, async(req, res)=>{
    const {success} = updateSchema.safeParse(req.body)
    if(!success){
        res.status(411).json({  
            message: "Error while updating information"
        })
    }

    await User.updateOne(req.body, {
        _id: req.userId
    })

    res.json({
        message: "Updated Successfully"
    })

})

router.get('/bulk', async(req, res, authMiddleware)=>{
    const filter = req.query.filter || "";

    const users = await User.find({
        $or:[{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user=> ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})


module.exports = router;