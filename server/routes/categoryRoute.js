const express = require('express')
const router = express.Router()
const {createCategoryController,updateCategoryController, getCategoryController, singleCategoryController, deleteCategoryController } = require('../controller/CategoryController.js')



//==============================================================================================================
router.post('/create-category', createCategoryController)
router.put('/update-category/:id', updateCategoryController)
router.get('/get-category', getCategoryController)
router.get('/get-singleCategory/:slug', singleCategoryController)
router.delete('/delete-category/:id', deleteCategoryController)


//===============================================================================================================

module.exports = router

//rest api url (for creating category) = http://localhost:8080/api/v1/category/create-category 