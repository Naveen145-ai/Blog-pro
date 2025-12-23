const express = require("express");

const auth = require("../middlewares/auth");
const logout = require("../controllers/logoutController");
const me = require("../controllers/meController");

const router = express.Router();

router.post("/logout", logout);
router.get("/me", auth, me);

module.exports = router;
