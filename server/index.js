const express = require('express')
const mongoose =require('mongoose')
const categoryRoute  = require('./routes/categoryRoute.js')
const productRoute = require('./routes/productRoute.js')
const mailRoute = require('./routes/mailRoute.js')


const app = express()
const port  = process.env.PORT ||8080

app.use(express.json())

app.use('/api/v1/categorys', categoryRoute)
app.use('/api/v1/items', productRoute)
app.use('/api/v1/sendMail', mailRoute)

mongoose.connect('mongodb://0.0.0.0/everest_momo').then(()=>{
    console.log("database is successfully connected")
    app.listen(port, ()=>{
        console.log(`server is running at port ${port}`)
    })
}).catch((error)=>{
    console.log("error::",err)
})






