/**
 * Middleware to validate the access token
 */

const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config");
const userModel = require("../model/user.model");

const verifyToken = (req, res, next) => {
  /**
   * if the token is present
   */

  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided",
    });
  }
  /**
   * if the token is valid
   */
  jwt.verify(token, config.secret, (error, decoded) => {
    if (error) {
      return res.status(410).send({
        message: "Invalid token",
      });
    }
    console.log("Token is valid");

    /**
     * Featch the userId from token and set it to the request object
     */

    req.userId = decoded.id; //decoded.id is userId
    next();
  });
};

/**
 * Middleware to go and check if user is ADMIN
 */

const isAdmin = async (req, res, next) => {
  const user = await userModel.findOne({
    userId: req.userId,
  });

  if (user && user.userType === "ADMIN") {
    next();
  } else {
    return res.status(403).send({
      message: "Only ADMIN user allowed ",
    });
  }
};

/**
 * Middleware to check if the user is admin or the owner
 */

const isAdminOrOwner = async (req, res, next) => {
  const user = await User.findOne({ userId: req.userId });
  if (user.userType == "ADMIN" || user.userId == req.params.id) {
    next();
  } else {
    return res.status(403).send({
      message: "Only ADMIN or owner of the resouse is allowed to update",
    });
  }
};
module.exports = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isAdminOrOwner: isAdminOrOwner,
};
