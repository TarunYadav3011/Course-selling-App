require("dotenv").config();
console.log(process.env.MONGO_URL)
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
    await mongoose.connect( process.env.MONGO_URL);
    app.listen(3000); 
    console.log("listening on port 3000")
}

main();