const { Router } = require("express");
const { userModel } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_USER_PASSWORD = "aeerthrteddr";

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

userRouter.get("/purchases", function(req, res){
    // you would expect the user to pay you money
    res.json({
        message: 'signup endpoint'
    })
})


module.exports = {
    userRouter: userRouter
}