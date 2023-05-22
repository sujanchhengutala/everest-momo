const categoryModel = require("../models/categoryModel.js");
const slugify = require("slugify");

/*======================================================================================================================================================================*/
// methode POST|| creating category process
/*======================================================================================================================================================================*/

const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res
        .status(500)
        .json({ success: false, message: "Name is required" });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res
        .status(200)
        .json({ success: true, message: "category is alreday exist" });
    }

    const category = await categoryModel.create({
      name,
      slug: slugify(name),
    });
    res.status(200).json({
      success: true,
      message: "category is successfully created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Error while creating category",
      error,
    });
  }
};

/*======================================================================================================================================================================*/
// methode Put|| updating category process
/*======================================================================================================================================================================*/

const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true } // flag to show the new updated document
    );
    res.status(200).json({
      success: true,
      message: "category is successfully updated",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Error while updating category",
      error,
    });
  }
};
/*======================================================================================================================================================================*/
// methode get|| getting category process
/*======================================================================================================================================================================*/

const getCategoryController = async (req, res) => {
    console.log("hello")
  try {
    const category = await categoryModel.find({});
    res.status(200).json({
      success: true,
      message: "All category List",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Error while getting category",
      error,
    });
  }
};
/*======================================================================================================================================================================*/
// methode get|| getting single category process
/*======================================================================================================================================================================*/

const singleCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;
    if(!slug){
        return res.status(401).json({success: false,
            message: "Product not found",})
    }
    const category = await categoryModel.findOne({ slug });
    res
      .status(200)
      .json({
        success: true,
        message: "single category is successfully obtained",
        category,
      });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Error while getting single category",
      error,
    });
  }
};
/*======================================================================================================================================================================*/
// methode delete|| deleting category process
/*======================================================================================================================================================================*/

const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete({ _id: id });
    res
      .status(200)
      .json({ success: true, message: "category is successfully deleted" });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Error while deleting category",
      error,
    });
  }
};

module.exports = {
  createCategoryController,
  updateCategoryController,
  getCategoryController,
  singleCategoryController,
  deleteCategoryController,
};
