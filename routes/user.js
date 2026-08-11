
const { Router } = require("express");

const userRouter = Router();

userRoter.post("/signup", function(req, res){
    res.json({
        message: 'signup endpoint'
    })
})

userRoter.post("/signin", function(req, res){
    res.json({
        message: 'signin endpoint'
    })
})

userRoter.get("/purchases", function(req, res){
    // you would expect the user to pay you money
    res.json({
        message: 'signup endpoint'
    })
})


module.exports = {
    userRoter: userRoter
}