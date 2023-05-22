const mongoose = require('mongoose')

const Schema = mongoose.Schema
const productSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    slug: {
        type: String,
        required: true,
      },
    category:{
        type:mongoose.ObjectId,
        ref:'Category',
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    photo:{
        data:Buffer,
        contentType:String,
    }

}, { timestamps: true })
module.exports = mongoose.model("Products", productSchema)