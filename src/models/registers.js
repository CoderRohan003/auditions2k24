const mongoose = require("mongoose");

const contestantSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type : String,
        required : true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    domain:{
        type: String,
        required: true
    },
    yearOfStudy:{
        type:Number,
        required:true
    },
    mobileNo:{
        type:Number,
        required:true,
        unique:true
    },
    registrationNo:{
        type:Number,
        required:true,
        unique:true
    },
    rollNo:{
        type:Number,
        required:true,
        unique:true
    }
})

// creating a collection

const Register = new mongoose.model("Register",contestantSchema)

module.exports = Register;