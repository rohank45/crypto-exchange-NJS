const { JsonWebTokenError } = require("jsonwebtoken");
const { default: userSchema } = require("../models/userSchema");

const authMiddleWare = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Login first to access this page" });
    }

    const decoded = JsonWebTokenError.verify(token, process.env.SECRET_KEY);
    req.user = await userSchema.findById(decoded.id);

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Token not found plzz Login!" });
  }
};

module.exports = authMiddleWare;
