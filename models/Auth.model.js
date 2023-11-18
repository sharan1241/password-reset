const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    secondaryEmail:{
        type:String,
        required:false
    },
    secondaryPhoneNumber:{
        type:String,
        required:false
    },
    profilePicture:{
        type:String,
        required:false
    },
    address:{
        addressLine1:{
            type:String,
            required:false
        },
        addressLine2:{
            type:String,
            required:false
        },
        state:{
            type:String,
            required:false
        },
        city:{
            type:String,
            required:false
        },
        pinCode:{
            type:String,
            required:false
        }
    },
    roles:{
        type:Array,
        default:["user"]
    },
    isActive:{
        type:Boolean,
        default:false
    },
    isKYC:{
        type:Boolean,
        required:false
    },
},{timestamps:true})

const AuthModel = mongoose.model("user",AuthSchema)

module.exports = AuthModel