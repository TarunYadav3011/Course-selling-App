const { Router } = require("express");
const adminRouter = Router();
const { adminModel } = require("../db");
// bcrypt , zod, jsonwebtoken

const { JWT_ADMIN_PASSWORD } = require("../config");
const { adminMiddleware} = require("../middleware/admin");


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

adminRouter.put("/course", adminMiddleware, async function(req, res){
    const adminId = req.userId;

    const { title, description, imageUrl, price, courseId } = req.body;

    const course = await courseModel.updateOne({
        _id: courseId,
        creatorId: adminId
    },{
        title: title, 
        description: description, 
        imageUrl: imageUrl, 
        price: price
    })
    res.json({
        message: 'course updated',
        courseId: course._id
    })
})

adminRouter.get("/course/bulk",adminMiddleware, async function(req, res){
    const adminId = req.userId;
    
    const courses = await courseModel.find({
        creatorId: adminId
    });

    res.json({
        message: 'course updated',
        courses
    })
})


module.exports = {
    adminRouter: adminRouter
}