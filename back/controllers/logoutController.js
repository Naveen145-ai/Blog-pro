const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = logout;
