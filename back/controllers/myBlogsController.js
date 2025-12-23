const Blog = require("../models/addBlogModel");

const getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.userId }).sort({ createdAt: -1 });
    return res.status(200).json(blogs);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const deleteMyBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    if (!blog.author || blog.author.toString() !== req.userId) {
      return res.status(403).json({ error: "Not allowed" });
    }

    await Blog.deleteOne({ _id: id });
    return res.status(200).json({ message: "Blog deleted" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { getMyBlogs, deleteMyBlog };
