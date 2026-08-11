const { Router } = require("express");
const adminRouter = Router();
const { adminModel } = require("../db");
// bcrypt , zod, jsonwebtoken

const JWT_ADMIN_PASSWORD = "11111323";

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

adminRouter.post("/course", function(req, res){
    res.json({
        message: 'course endpoint'
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