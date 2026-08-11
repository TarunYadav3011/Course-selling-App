

const mongoose = require("mongoose");
console.log("connected to db");


const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

// const Schema = mongoose.Schema;
// const ObjectId = mongoose.Types.ObjectId;



const userSchema = new Schema({
    email: {type: String,unique: true },
    password: String,
    fistName : String,
    lastName : String
});

const adminSchema = new Schema({
    email: {type: String, unique: true },
    password: String,
    fistName : String,
    lastName : String
});

const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imagUrl: String,
    creatorId: ObjectId
});

const purchaseSchema = new Schema({
    userId: ObjectId,
    cousreId: ObjectId
});

const userModel = mongoose.model("User", userSchema);
const adminModel = mongoose.model("Admin", adminSchema);
const courseModel = mongoose.model("Course", courseSchema);
const purchaseModel = mongoose.model("Purchase", purchaseSchema);

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}