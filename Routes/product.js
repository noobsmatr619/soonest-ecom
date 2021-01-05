const router = require("express").Router();
const upload = require("../upload");
const Product = require("../model/Product");
const auth = require("../middleware/auth");

const config = require("config");
const verify = require("../middleware/verify");
router.get("/", async (req, res) => {
  try {
    let product = await Product.find({});
    // console.log(product);
    res.status(200).json(product);
  } catch (error) {}
});

router.get("/:id", auth, verify.isAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(400).json({ msg: "Product Not Found" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.post(
  "/addproduct",
  auth,
  verify.isAdmin,
  upload.single("image"),
  async (req, res) => {
    let { name, size, quantity, description, star, category, price } = req.body;
    let { filename } = req.file;
    try {
      let newProduct = new Product({
        name: name,
        image: filename,
        star,
        category,
        size,
        quantity,
        description,
        price,
      });
      await newProduct.save();
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);
router.post(
  "/:id",
  auth,
  verify.isAdmin,
  upload.single("image"),
  async (req, res) => {
    console.log("mahad Route");
    let { name, size, quantity, description, star, category, price } = req.body;
    // console.log(req.body);
    try {
      if (req.file) {
        let { filename } = req.file;
        await Product.findByIdAndUpdate(req.params.id, {
          name: name,
          image: filename,
          star: star,
          category: category,
          size: size,
          quantity: quantity,
          description: description,
          price: price,
        });
      } else {
        await Product.findByIdAndUpdate(req.params.id, {
          name: name,
          star: star,
          category: category,
          size: size,
          quantity: quantity,
          description: description,
          price: price,
        });
      }
      res.status(200).json({});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);
router.patch("/update/:id", auth, verify.isAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    product.remove();
    res.status(200).json({});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", auth, verify.isAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    product.remove();
    res.status(200).json({});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
