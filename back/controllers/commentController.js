const Blog = require('../models/addBlogModel');
const User = require('../models/userModel');
const Comment = require('../models/commentModel');
const jwt = require('jsonwebtoken');

// Helper: try to set req.userId if token valid, but don't throw
const tryAttachUser = (req) => {
  try {
    const token = req.cookies && req.cookies.token;
    if (!token) return;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
  } catch (err) {
    // ignore invalid/missing token (optional auth)
  }
};

const addComment = async (req, res) => {
  try {
    tryAttachUser(req);

    const { id } = req.params; // blog id
    const { text, name } = req.body;

    if (!text || (!name && !req.userId)) {
      return res.status(400).json({ error: 'Comment text and name (when not logged in) are required' });
    }

    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    const commentData = { blog: id, text };

    if (req.userId) {
      commentData.user = req.userId;
      const user = await User.findById(req.userId).select('name');
      commentData.name = user && user.name ? user.name : (name || 'Anonymous');
    } else {
      commentData.name = name;
    }

    const comment = await Comment.create(commentData);

    return res.status(201).json(comment);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getComments = async (req, res) => {
  try {
    const { id } = req.params; // blog id
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    const comments = await Comment.find({ blog: id }).sort({ createdAt: -1 });
    return res.status(200).json(comments);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addComment,
  getComments
};
