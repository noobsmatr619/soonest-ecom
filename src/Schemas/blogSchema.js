let mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    marker: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

// eslint-disable-next-line no-undef
module.exports = Blog = mongoose.model("blog", blogSchema);

