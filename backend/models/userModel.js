import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    CartData: {type:Object, default:{}}
},{minimize:false}) //By default, Mongoose removes empty objects ({}) from documents. Setting minimize: false prevents this behavior, ensuring that even empty objects (e.g., CartData: {}) are saved in the database.

const userModel = mongoose.models.user || mongoose.model('user',userSchema);
export default userModel