const { Roter } = require("express");

const courseRouter = Router();

app.post("/purchase", function(req, res){
    res.json({
        message: 'signup endpoint'
    })
})

app.get("/preview", function(req, res){
    res.json({
        message: 'signup endpoint'
    })
})


module.exports = {
    courseRouter: courseRouter
}