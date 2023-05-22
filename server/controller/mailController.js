const nodemailer = require("nodemailer")
const contactModel = require("../models/contactModel.js")

//regexp for name
const nameRegExp = /^[a-zA-Z\s]+$/
//regexp for email validation
const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
       //number validation 
        const phoneRegExp = /^98\d{8}$/
//Nodemailer configuration
const nodemailerOptions =
{
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: 'willy.jones@ethereal.email',
        pass: 'A1WKkwUASpUtkWjrZr'
    },
  }

let transporter = nodemailer.createTransport(nodemailerOptions);

const mailController = async(req, res)=>{

    const {fname, lname, phone, service,email, message} = req.body
    switch (true) {
        case !fname: 
        return res.status(400).json({"success":false, "message":"fname name is required"})
        case (!nameRegExp.test(fname)):
            return res.status(400).json({"success":false, valid:false, "message":"Invalid first name"})

        case !lname: 
        return res.status(400).json({"success":false, "message":"last name is required"})
        case (!nameRegExp.test(lname)):
            return res.status(400).json({"success":false, valid:false, "message":"Invalid last name"})

        case !phone: 
        return res.status(400).json({"success":false, "message":"phone-no is required"})
        case (!phoneRegExp.test(phone)):
            return res.status(400).json({"success":false, valid:false, "message":"Invalid phone number"})

        case !service: 
        return res.status(400).json({"success":false, "message":"service name is required"})
        case !message: 
        return res.status(400).json({"success":false, "message":"message is required"})
        case !email: 
        return res.status(400).json({"success":false, "message":"email is required"})
        case (!emailRegExp.test(email)):
            return res.status(400).json({"success":false, valid:false, "message":"email is invalid"})
    }
     await contactModel.create({fname, lname, email, phone, service, message}).then(()=>{
        const mailOption = {
            from:`${email}`,
            to:"cleve.morar@ethereal.email",
            subject:'New contact message',
            html:`Name: ${fname} ${lname}<br>
            Emali:${email}<br>
            phone:${phone}<br>
            service:${service}<br>
            <br><br><br>
            message:<br><b>${message}</b>
            `
        }

        transporter.sendMail(mailOption, (err, data)=>{
            if(err){
                console.log(err)
                res.status(400).json({"success":false, "message":"failed to send email"})
            }else{
                // console.log(data.response)
                res.status(200).json({"success":true, "message":"email sent successfully"})
            }
        })
    }).catch((error)=>{
        res.status(500).json({ error: 'Failed to add contact' })
    })}

module.exports = {mailController}