
const Blog = require('../models/addBlogModel');

const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;  

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = getSingleBlog;