let ProductRouter = require("express").Router();
let Prod = require("../Schemas/productSchema");

ProductRouter .post("/prod", async (req, res) => {
  let { title, marker} = req.body;

  if (!title || !marker)
    return res
      .status(400)
      .json({ msg: "title and text both needed." });

  try {
    let newproduct= newproduct({
      title,
      marker
    });

    let savedproduct= await newBlog.save();
    res.json(savedBlog);
  } catch (err) {
    res.status(500).json({ err });
  }
});

ProductRouter .get("/blog", async (req, res) => {
  try {
    letproducts = awaitproduct.find();
    res.json(blogs);
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
   res.send("blogging")
  });

module.exports = ProductRouter ;