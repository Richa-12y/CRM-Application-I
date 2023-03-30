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
const isEligibleToUpdate = async (req, res, next) => {
  /**
   * Write the logic to check if the calling user is eligible to
   * update the ticket.
   */
  const callingUser = await User.findOne({ userId: req.userId });

  const ticket = await Ticket.findOne({ _id: req.params.id });

  if (!ticket) {
    return res.status(400).send({
      message: "Ticket id passed is incorrect",
    });
  }

  if (callingUser.userType == "CUSTOMER") {
    if (ticket.reporter != callingUser.userId) {
      return res.status(403).send({
        message: "User is not allowed to update the ticket",
      });
    }
  } else if (callingUser.userType == "ENGINEER") {
    if (
      ticket.reporter != callingUser.userId &&
      ticket.assignee != callingUser.userId
    ) {
      return res.status(403).send({
        message: "User is not allowed to update the ticket",
      });
    }
  }

  next();
};

module.exports = {
  validateTicketReqBody: validateTicketReqBody,
};
