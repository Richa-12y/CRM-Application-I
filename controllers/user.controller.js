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

exports.findAll = (req, res) => {
  try {
    const users = User.find({});
    res.status(200).send(objectConverter.userResponse(users));
  } catch (error) {
    console.log("Error while fetching the users", error.message);
    res.status(500).send({
      message: "Internal Server Error while featching the users ",
    });
  }
};
