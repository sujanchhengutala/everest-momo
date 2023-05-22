const express = require('express')
const {mailController} = require("../controller/mailController.js")
const router = express.Router()

router.post("/mail", mailController)

module.exports = router