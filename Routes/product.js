const router = require("express").Router();
const upload = require("../upload");
const Product = require("../Model/Product");
const User = require("../Model/User");
const auth = require("../middleware/auth");

const config = require("config");
const verify = require("../middleware/verify");
router.get("/", async (req, res) => {
  try {
    let product = await Product.find({});
    // console.log(product);
    res.status(200).json(product);
  } catch (error) { }
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
      res.status(200).json({ success: true, id: response._id });
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
router.patch("/rate", auth, async (req, res) => {
  console.log(req.body);
  const { id, paymentId, star } = req.body;
  try {
    const product = await Product.findById(id);
    if (product) {
      product.star =
        (Number(product.star) + Number(star)) /
        (Number(product.count) + Number(1));
      product.count = product.count + 1;
      await User.findById(req.user.id).then(async user => {
        let orderhistory = user.orderhistory.map(p => {
          if (p.paymentId === paymentId && p.id === id) {
            p.rate = true;
          }
          return p;
        });
        console.log(orderhistory);
        user.orderhistory = [];
        user.orderhistory = orderhistory;

        console.log(user.orderhistory);
        await user.save();
      });

      await product.save();
      res.status(200).json({});
    } else {
      console.log("erro");
    }
  } catch (error) {
    console.log(error);
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
