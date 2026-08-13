const { Router } = require("express");
const { userModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");

const { userMiddleware} = require("../middleware/user");

const userRouter = Router();

userRouter.post("/signup", async function(req, res){
    const { email, password, firstName, lastName } = req.body; //todo adding zod validation
    //tod: hash the password so plain password doesn't directly store in db

    
    await userModel.create({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
        })

    res.json({
        message: 'signup succeeded'
    })
})


userRouter.post("/signin", async function(req, res){
    const { email , password } = req.body;

    //ideally password should be hashed, and hence you can't comapre the suer provided password and the database password
    const user = await userModel.findOne({
        email: email,
        password: password
    })
    if (user){
        const token = jwt.sign({
            id: user._id
        }, JWT_USER_PASSWORD);

        //do cookie logic

        res.json({
            token: token
        })
        } else {
            res.status(403).json({
                message: "Iccorrect credentials"
            })
        }
})

userRouter.get("/purchases",userMiddleware, async function(req, res){
    const userId = req.world;

    const purchases = await purchaseModel.find({
        userId
    })
    const coursedata = await courseModel.find({
        _id: { $in: purchases.map(x => x.courseId) }
    })
    
    res.json({
        purchases
    })
})


module.exports = {
    userRouter: userRouter
}