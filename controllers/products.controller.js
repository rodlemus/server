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
    let productImage = req.files.productImage;
    if (productImage) {
      console.log('ENTRA =>')
      const fileExtension = productImage.name.substr(
        productImage.name.length - 3
      );

      if (fileExtension !== "png" && fileExtension !== "jpg") {
        throw new Error("Wrong file type");
      }

      const imageName = new Date().getTime() + "." + fileExtension;

      console.log('Name to create=>', imageName)
      await productImage.mv("./uploads/" + imageName);
      const imageResponse = await cloudinary.uploader.upload(
        "./uploads/" + imageName
      );
      console.log('IMAGE RESPONSE =>',imageResponse)
      const image = {productImage: imageResponse.url};
      const productDataToPatch = {...image,...req.body};
      console.log(productDataToPatch)
      await ProductEntity.findByIdAndUpdate(id, {...productDataToPatch});
            res.status(204).send({data:'product updated ok'});
    } else {
      console.log('ENTRA CUANDO NO HAY IMAGEN')
      await ProductEntity.findByIdAndUpdate(id, { ...req.body });
      res.status(204).send({
        message: "product updated",
      });
    }
  } catch (error) {
    console.log(error)
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

    if (!categoryId) {
      ProductEntity.find({})
        .sort(sort)
        .limit(limit)
        .populate("category")
        .skip(skip)
        .exec((err, category) => {
          if (err) throw new Error("error populate");
          res.status(200).send({ data: category });
        });
    } else {
      ProductEntity.find({ category: categoryId })
        .sort(sort)
        .limit(limit)
        .populate("category")
        .skip(skip)
        .exec((err, category) => {
          if (err) throw new Error("error populate");
          res.status(200).send({ data: category });
        });
    }
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
    ProductEntity.find({
      productName: { $regex: `^${productName}` },
    })
      .sort(sort)
      .limit(limit)
      .populate("category")
      .skip(skip)
      .exec((err, category) => {
        if (err) throw new Error("error populate");
        res.status(200).send({ data: category });
      });
  } catch (error) {
    res.status(500).send();
  }
};
module.exports = productsController;
