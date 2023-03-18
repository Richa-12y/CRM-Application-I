const User = require("../model/user.model");
const Ticket = require("../model/ticket.model");

const validateTicketReqBody = (req, res, next) => {
  /**
   * Check if body.req.title is not present it is bad request
   * write a condition for that
   */
  if (!req.body.title) {
    res.status(400).send({
      message: "Title of the ticket is missing",
    });
  }
  /**
   * Check if body.req.description is not present it is bad request
   * write a condition for that
   */
  if (!req.body.description) {
    res.status(400).send({
      message: "Description of the ticket is missing",
    });
  }
  /**
   * Check if body.req.status is present
   * write a condition for that
   */

  if (req.body.status != undefined) {
    if (!["OPEN", "IN_PROGRESS", "CLOSED"].includes(req.body.status)) {
      return res.status(400).send({
        message: "Not a valid status",
      });
    }
  }
  next();
};

module.exports = {
  validateTicketReqBody: validateTicketReqBody,
};
