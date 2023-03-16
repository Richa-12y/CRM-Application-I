/**
 * This file will contain the logic to fetch all users
 *
 *  1. Is a valid user
 *  2. He should be admin
 *
 * Above validation should be done as the part of middlware
 *
 */

const User = require("../model/user.model");
const objectConverter = require("../utils/objectConverter");

exports.findAll = async (req, res) => {
  try {
    /**
     * Read the query params if any
     */

    const queryObj = {};
    const userTypeQ = req.query.queryObj;
    if (userTypeQ) {
      queryObj.userTypeQ = userTypeQ;
    }

    const userStatusQ = req.query.userStatus;
    if (userStatusQ) {
      queryObj.userStatus = userStatusQ;
    }
    const users = await User.find(queryObj);

    const user = User.find({});
    res.status(200).send(objectConverter.userResponse(users));
  } catch (error) {
    console.log("Error while fetching the users", error.message);
    res.status(500).send({
      message: "Internal Server Error while featching the users ",
    });
  }
};
/**
 * Controller Methode to update the user recoder
 * 1.Only ADMIN and the owner should be allowed to update the records
 * --this has to be done in the middleware
 */

exports.update = async (req, res) => {
  try {
    /**
     * Fetch the User object if it's present
     */
    const user = await User.findOne({ userId: req.params.id });
    /**
     * Update the user object based on the request
     */
    user.name = req.body.name != undefined ? req.body.name : user.name;
    user.userStatus =
      req.body.userStatus != undefined ? req.body.userStatus : user.userStatus;

    user.userType =
      req.body.userType != undefined ? req.body.userType : user.userType;

    /**
     * save the user object and return the updated object
     */
    const updatedUser = await user.save();
    res.status(200).send({
      name: updatedUser.name,
      userId: updatedUser.userId,
      userStatus: updatedUser.userStatus,
      email: updatedUser.email,
      userType: updatedUser.userType,
    });
  } catch (error) {
    console.log("Error while update the user", error.message);
    res.status(500).send({
      message: "Internal Server Error while updating the record",
    });
  }
};
