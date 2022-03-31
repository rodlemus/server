const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;
const model = mongoose.model;

const ProductSchema = new Schema({
  productImage: { type: String },
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  stock: {
    type: Number,
    required: true,
    get: (value) => {
      return value === 0 ? "sold out" : value;
    },
  },
  category: { type: mongoose.Types.ObjectId, ref: "Category" },
});

ProductSchema.plugin(mongoosePaginate);
const ProductEntity = model("Product", ProductSchema);

module.exports = ProductEntity;
