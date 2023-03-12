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
