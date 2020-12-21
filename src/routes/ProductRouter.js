let ProductRouter = require("express").Router();
let Prod = require("../Schemas/productSchema");

ProductRouter .post("/prod", async (req, res) => {
//    name: { type: String, required: true, unique: true },
//     image: { type: String, required: true },
//     description: { type: String, required: true },
//     price: { type: Number, required: true },
//     countInStock: { type: Number, required: true },
//     rating: { type: Number,default:false, required: true },
//     numReviews: { type: Number,default:false, required: true },
//     reviews: [reviewSchema],
  let { name, image,description,price, countInStock,rating,numReviews,reviews} = req.body;

  if (!name||  !image|| !description|| !price|| !countInStock|| !rating||!numReviews||!reviews)
    return res
      .status(400)
      .json({ msg: "All the recquired fields are need to filled " });

  try {
    let newproduct= new Product({
    title,
    name,
    image,
    description,
    price,
    countInStock,
    rating,
    numReviews,
    review
    });

    let savedproduct= await newproduct.save();
    res.json(savedproduct);
  } catch (err) {
    res.status(500).json({ err });
  }
});

ProductRouter .get("/prod", async (req, res) => {
  try {
    let products = awaitproduct.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ err });
  }
});

ProductRouter .get("/single/:id", async (req, res) => {
  try {
    letproduct = awaitproduct.findById(req.params.id);
    res.json(blog);
  } catch (err) {
    res.status(500).json({ err });
  }
});

ProductRouter .get("/test", async (req, res) => {
   res.send("works prod")
  });

module.exports = ProductRouter ;