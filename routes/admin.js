const { Router } = require("express");
const adminRouter = Router();
const { adminModel } = require("../db");
// bcrypt , zod, jsonwebtoken

const { JWT_ADMIN_PASSWORD } = require("../config");
const { adminMiddleware, userMiddleware} = require("../middleware/admin");


adminRouter.post("/signup", async function(req, res){
    const { email, password, firstName, lastName } = req.body; //todo adding zod validation
    //tod: hash the password so plain password doesn't directly store in db

    
    await adminModel.create({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
        })

    res.json({
        message: 'signup succeeded'
    })
})


adminRouter.post("/signin", async function(req, res){
    const { email , password } = req.body;

    //ideally password should be hashed, and hence you can't comapre the suer provided password and the database password
    const admin = await adminModel.findOne({
        email: email,
        password: password
    })
    if (admin) {
        const token = jwt.sign({
            id: admin._id
        }, JWT_ADMIN_PASSWORD);

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

adminRouter.post("/course", adminMiddleware, async function(req, res){
    const adminId = req.userId;

    const { title, description, imageUrl, price } = req.body;

    const course = await courseModel.create({
        title: title, 
        description: description, 
        imageUrl: imageUrl, 
        price: price, 
        creatorId: adminId
    })
    res.json({
        message: 'course cretaed',
        courseId: course._id
    })
})

adminRouter.put("/course", function(req, res){
    res.json({
        message: 'course endpoint'
    })
})

adminRouter.get("/course/bulk", function(req, res){
    res.json({
        message: 'course endpoint'
    })
})


module.exports = {
    adminRouter: adminRouter
}