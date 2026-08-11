const express = require("express");
const { createUserRoute } = require("./routes/user");
const { createCourseRoute } = require("./routes/user");

const app = express();


app.use("/user",userRouter);
app.use("/course",courseRouter);

createUserRoute(app);
createCourseRoute(app);

app.listen(3000); 