const mongoose = require("mongoose");

const StringSchema = new mongoose.Schema({
    String:{
        type:String,
        required:true
    }
},{timestamps:true})

const StringModel = mongoose.model("string",StringSchema)

module.exports = StringModel