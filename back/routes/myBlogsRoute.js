const express = require("express");

const auth = require("../middlewares/auth");
const { getMyBlogs, deleteMyBlog } = require("../controllers/myBlogsController");

const router = express.Router();

router.get("/my-blogs", auth, getMyBlogs);
router.delete("/my-blogs/:id", auth, deleteMyBlog);

module.exports = router;
