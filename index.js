const express = require("express");
const { createUserRoute } = require("./routes/user");
const { createCourseRoute } = require("./routes/user");

const app = express();


app.use("/user",userRouter);
app.use("/course",courseRouter);


app.listen(3000); 