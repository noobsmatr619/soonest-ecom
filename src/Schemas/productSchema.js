let mongoose = require("mongoose");
let reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);




let productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number,default:false, required: true },
    numReviews: { type: Number,default:false, required: true },
    reviews: [reviewSchema],
    },
  {
    timestamps: true,
  }
  );
  
  module.exports = Product = mongoose.model("product", productSchema);
