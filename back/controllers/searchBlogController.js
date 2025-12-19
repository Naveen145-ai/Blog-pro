const Blog = require('../models/addBlogModel');

const searchBlogs = async (req, res) => {
  try {
    const { q } = req.query;

    // If no search text
    if (!q) {
      return res.status(400).json({ error: "Search query missing" });
    }

    const blogs = await Blog.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { content: { $regex: q, $options: "i" } }
      ]
    }).sort({ createdAt: -1 });

    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = searchBlogs;
