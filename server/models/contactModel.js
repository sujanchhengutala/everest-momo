const mongoose = require('mongoose')
const Schema = mongoose.Schema
const contactSchema = new Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true,
    },
    message:{
        type:String,
        required:true 
    },
    service:{
        type:String,
        required:true
    }
},
{
    timestamps: true,
})

module.exports = mongoose.model("Contact", contactSchema)


