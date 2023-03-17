/**
 * Controller method for creating tickets
 *
 *    1. User is authenticated  --- Taken care by auth middleware
 *    2. Req body is validated -- Middlware
 *    3. Insert the ticket body
 */
const userModel = require("../models/user.model");
const ticketModel = require("../model/ticket.model");

exports.createTicket = async (req, res) => {
  /**
   * Create the ticketObject from requext body
   */
  try {
    const reqObj = {
      title: req.body.title,
      ticketPriority: req.body.ticketPriority,
      description: req.body.description,
      status: req.body.status,
      reporter: req.userId, //will be retrieved from the  access token
    };

    /**
     * I need to assign one Engneer to this ticket
     * Assigment:Change the code and assign to engneer who have least number of tickets
     */
    const engneer = await userModel.findOne({
      userType: "ENGINEER",
      userStatus: "APPROVED",
    });
    if (engneer) {
      reqObj.assignee = engneer.userId;
    }

    const ticketCreated = await ticketModel.create(reqObj);

    if (ticketCreated) {
      /**
       * Need to update customer document
       */
      const customer = await userModel.findOne({ userId: req.userType });
      customer.ticketCreated.push(ticketCreated._id);
      await customer.save();
      /**
       * Update the Engneer document if assigned
       */

      if (engneer) {
        engneer.ticketAssigned.push(ticketCreated._id);
        await engneer.save();
      }
      res.status(201).send(ticketCreated);
    }
  } catch (error) {
    console.log("Error while creating Ticket", error.message);
  }
};
