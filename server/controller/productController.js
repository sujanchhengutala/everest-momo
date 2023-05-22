const slugify = require("slugify");
const productModel = require("../models/productModel.js");
// const categoryModel = require('../models/categoryModel.js')
const fs = require("fs");

/*======================================================================================================================================================================*/
// methode POST|| creating product process
/*======================================================================================================================================================================*/

const createProductController = async (req, res) => {
  try {
    const { name, price, category } = req.fields;
    const { photo } = req.files;
    if (!name) {
      return res
        .status(401)
        .json({ success: false, message: "Name is required" });
    }

    if (!price) {
      return res
        .status(401)
        .json({ success: false, message: "price is required" });
    }

    if (!category) {
      return res
        .status(401)
        .json({ success: false, message: "category is required" });
    }
    if (photo && photo.size > 26214400) {
      return res
        .status(500)
        .send({ error: "photo is Required and should be less then 25mb" });
    }
    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    res.status(201).json({
      success: true,
      message: "Product Created Successfully",
      products,
    });
    await products.save();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Error while creating products",
      error,
    });
  }
};

/*======================================================================================================================================================================*/
// methode get|| getting all product
/*======================================================================================================================================================================*/

const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      counTotal: products.length,
      message: "ALlProducts ",
      products,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "error while getting products", error });
  }
};

/*======================================================================================================================================================================*/
// methode get|| getting single product product
/*======================================================================================================================================================================*/

const singleProductController = async (req, res) => {
  const slug = req.params.slug;
  try {
    const product = await productModel
      .findOne({ slug })
      .populate("category")
      .select("-photo");
    res.status(200).json({
      success: true,
      message: "product successfully fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "failed to getting product", error });
  }
};

/*======================================================================================================================================================================*/
// methode put|| updating product
/*======================================================================================================================================================================*/

const updateProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const { photo } = req.files;
    const { name, price, category } = req.fields;
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "name is required" });
    }

    if (!price) {
      return res
        .status(400)
        .json({ success: false, message: "name is required" });
    }

    if (!category) {
      return res
        .status(400)
        .json({ success: false, message: "name is required" });
    }
    if (photo && photo.size > 26214400) {
      return res
        .status(500)
        .send({ error: "photo is Required and should be less then 25mb" });
    }

    const products = await productModel.findByIdAndUpdate(
      id,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    products.photo.data = fs.readFileSync(photo.path);
    products.photo.contentType = photo.type;
    await products.save();
    res
      .status(200)
      .json({ success: true, message: "successfully updated", products });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "somethings went wrong while updating",
      error,
    });
  }
};

/*======================================================================================================================================================================*/
                                        // methode delete|| updating product
/*======================================================================================================================================================================*/

const deleteProductController = async(req, res)=>{
    try {
        const {id}= req.params
        const products = await productModel.findByIdAndDelete(id).select("-photo")
        res.status(200).json({"success":true, "message":"item successfully deleted"})

    } catch (error) {
        console.log(error)
        return res.status(400).json({"success":false, "message":"faield to delete product", error})
    }
}

const productPhotoController = async(req, res)=>{

    try {
        // const {id} = req.params
        const product = await productModel.findById(req.params.pid).select("photo");
        if (product.photo.data) {
          res.set("Content-type", product.photo.contentType);
          return res.status(200).send(product.photo.data);
        }
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Erorr while getting photo",
          error,
        });
      }



    // const {id} = req.params
    // const product = await productModel.findById(id).select("photo")
    // if(product.photo.data){
    //     res.set("Content-Type", product.photo.contentType)
    //     return res.status(200).json(product.photo.data)
    // }
}

module.exports = {
  createProductController,
  getProductController,
  singleProductController,
  updateProductController,
  deleteProductController,
  productPhotoController
};
