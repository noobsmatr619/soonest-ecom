let BlogRouter = require("express").Router();
let Blog = require("../Schemas/blogSchema");

BlogRouter.post("/blog", async (req, res) => {
  let { title, marker} = req.body;

  if (!title || !marker)
    return res
      .status(400)
      .json({ msg: "title and text both needed." });

  try {
    let newBlog = new Blog({
      title,
      marker
    });

    let savedBlog = await newBlog.save();
    res.json(savedBlog);
  } catch (err) {
    res.status(500).json({ err });
  }
});

BlogRouter.get("/blog", async (req, res) => {
  try {
    let blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ err });
  }
});

BlogRouter.get("/single/:id", async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);
    res.json(blog);
  } catch (err) {
    res.status(500).json({ err });
  }
});

 BlogRouter.delete("/blogdelete",async (req, res) => {
        try {
          let deletedBlog = await product.findByIdAndDelete(req.user);
          res.json(deletedBlog);
        } catch (err) {
          res.status(500).json({ error: err.message });
        }

      });




BlogRouter.get("/test", async (req, res) => {
   res.send("blogging")
  });




module.exports = BlogRouter;