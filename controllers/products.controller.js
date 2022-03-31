const ProductEntity = require("../models/product.entity");
const productsController = {};
const cloudinary = require("../config/cloudImages");

productsController.saveProduct = async (req, res) => {
  try {
    const { productName, price, stock, description, category } = req.body;
    let productImage = req.files.productImage;

    const fileExtension = productImage.name.substr(
      productImage.name.length - 3
    );

    if (fileExtension !== "png" && fileExtension !== "jpg") {
      throw new Error("Wrong file type");
    }

    const imageName = new Date().getTime() + "." + fileExtension;

    await productImage.mv("./uploads/" + imageName);
    const imageResponse = await cloudinary.uploader.upload(
      "./uploads/" + imageName
    );

    const product = await ProductEntity.create({
      productName,
      price,
      description,
      stock,
      productImage: imageResponse.url,
      category,
    });
    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};

productsController.updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    await ProductEntity.findByIdAndUpdate(id, { ...req.body });
    res.status(204).send({
      message: "product updated",
    });
  } catch (error) {
    res.status(500).send();
  }
};

productsController.deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    await ProductEntity.findByIdAndRemove(id, { ...req.body });
    res.status(204).send();
  } catch (error) {
    res.status(500).send();
  }
};

productsController.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductEntity.findById(id, { ...req.body });
    res.status(200).send({ data: product });
  } catch (error) {
    res.status(500).send();
  }
};

productsController.getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.body;
    const limit = req.query.limit || 15;
    const skip = req.query.skip || 0;
    const sort = req.query.sort || "asc";
    const products = await ProductEntity.find({ category: categoryId })
      .sort(sort)
      .limit(limit)
      .populate("category")
      .skip(skip);
    res.status(200).send({ data: products });
  } catch (error) {
    res.status(500).send();
  }
};

productsController.getProductsBySearch = async (req, res) => {
  try {
    const { productName } = req.body;
    const limit = req.query.limit || 15;
    const skip = req.query.skip || 0;
    const sort = req.query.sort || "asc";
    const products = await ProductEntity.find({
      productName: { $regex: `^${productName}` },
    })
      .sort(sort)
      .limit(limit)
      .populate("category")
      .skip(skip)
      .exec();
    res.status(200).send({ data: products });
  } catch (error) {
    res.status(500).send();
  }
};
module.exports = productsController;
