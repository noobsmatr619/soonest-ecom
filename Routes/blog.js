const router = require("express").Router();
const upload = require("../upload");
const Blog = require("../Model/Blog");
const auth = require("../middleware/auth");

const config = require("config");
const verify = require("../middleware/verify");
router.get("/", async (req, res) => {
  try {
    let blog = await Blog.find({});
    // console.log(product);
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", auth, verify.isAdmin, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(400).json({ msg: "Blog Not Found" });
    }

    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.post(
  "/addblog",
  auth,
  verify.isAdmin,
  upload.single("image"),
  async (req, res) => {
    let { title, category, editor } = req.body;
    let { filename } = req.file;
    console.log(req.file);
    try {
      let blog = new Blog({
        title,
        image: filename,
        category,
        editor,
      });
      console.log(Blog);
      await blog.save();
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

    let { title, category, editor } = req.body;
    // console.log(req.body);
    try {
      if (req.file) {
        let { filename } = req.file;
        await Blog.findByIdAndUpdate(req.params.id, {
          title,
          image: filename,
          category,
          editor,
        });
      } else {
        await Blog.findByIdAndUpdate(req.params.id, {
          title,
          category,
          editor,
        });
      }
      res.status(200).json({});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);
// router.patch("/update/:id", auth, verify.isAdmin, async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     product.remove();
//     res.status(200).json({});
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

router.delete("/:id", auth, verify.isAdmin, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    blog.remove();
    res.status(200).json({});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
