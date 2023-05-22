const express = require('express')
const formidable = require("express-formidable")
const {createProductController, getProductController, singleProductController, updateProductController, deleteProductController, productPhotoController} = require('../controller/productController.js')

const router = express.Router()

router.get('/get-products', getProductController)
router.get('/get-singleProduct/:slug', singleProductController)
router.put('/update-products/:id', formidable(), updateProductController)
router.post('/create-product', formidable(), createProductController)
router.delete('/delete-product/:id',  deleteProductController)
router.get('/get-photoController/:pid', productPhotoController)


module.exports = router