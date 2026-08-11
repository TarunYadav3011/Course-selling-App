const express = require("express");
const { courseRouter } = require("./routes/course");
const { userRouter  } = require("./routes/user");
const { adminRouter } = require("./routes/admin");
const mongoose = require("mongoose");
const app = express();


app.use("/api/v1/user",userRouter);
app.use("/api/v1/admin",adminRouter);
app.use("/api/v1/course",courseRouter);

async function main(){
    await mongoose.connect("mongodb+srv://tarunyadav2103:lo8FcaSGr0hYmdQG@cluster0.oob4e1y.mongodb.net/course selling app");
    app.listen(3000); 
    console.log("listening on port 3000")
}

main();