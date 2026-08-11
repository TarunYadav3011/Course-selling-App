const express = require("express");
const { courseRouter } = require("./routes/course");
const { userRouter  } = require("./routes/user");
const { adminRouter } = require("./routes/admin");
const app = express();


app.use("/api/v1/user",userRouter);
app.use("/api/v1/admin",adminRouter);
app.use("/api/v1/course",courseRouter);


app.listen(3000); 