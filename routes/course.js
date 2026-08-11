const { Roter } = require("express");

const courseRouter = Router();

app.post("/course/purchase", function(req, res){
    res.json({
        message: 'signup endpoint'
    })
})

app.get("/course/preview", function(req, res){
    res.json({
        message: 'signup endpoint'
    })
})


module.exports = {
    courseRouter: courseRouter
}