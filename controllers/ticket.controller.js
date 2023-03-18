/**
 * Controller method for creating tickets
 *
 *    1. User is authenticated  --- Taken care by auth middleware
 *    2. Req body is validated -- Middlware
 *    3. Insert the ticket body
 */
const userModel = require("../model/user.model");
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
      const customer = await userModel.findOne({ userId: req.userId });
      customer.ticketsCreated.push(ticketCreated._id);
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

/**
 * Method to fetch all the users
 */

exports.getTickets = async (req, res) => {
  try {
    /**
     * so that dependeing on the user,correct list of tickets and returned
     */
    /**
     * First fetch the details of the user who is making the call
     */
    const userId = req.userId;
    const callingUserObj = await userModel.findOne({ userId: userId });
    const queryObj = {};
    /**
     * Then make the query object based on the user type
     */
    if (callingUserObj.userType == "CUSTOMER") {
      queryObj.reporter = req.userId;
    } else if (callingUserObj.userType == "ENGINEER") {
      queryObj.$or = [{ reporter: req.userId }, { assignee: req.userId }];
      console.log(queryObj);
    }
    /**
     * Finally return the result
     */
    const tickets = await ticketModel.find(queryObj);
    return res.status(200).send(tickets);
  } catch (error) {
    console.log("Error while fetching tickets", error.message);
    res.status(500).send({
      message: "Internal server Error",
    });
  }
};
