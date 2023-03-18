const auth = require("../middlwares/authjwt");
const ticketValidator = require("../middlwares/ticket.middlware");
const ticketController = require("../controllers/ticket.controller");

module.exports = (app) => {
  /**
   * Creating a ticket
   *
   *POST  /crm/api/vi/tickets
   *
   */

  app.post(
    "/crm/api/v1/tickets",
    [auth.verifyToken, ticketValidator.validateTicketReqBody],
    ticketController.createTicket
  );

  /**
   * Fetching all the tickets
   * GET /crm/api/vi/tickets
   */
  //   app.get("/crm/api/v1/tickets");
};
