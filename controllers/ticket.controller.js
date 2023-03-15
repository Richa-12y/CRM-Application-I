/**
 * Controller method for creating tickets
 *
 *    1. User is authenticated  --- Taken care by auth middleware
 *    2. Req body is validated -- Middlware
 *    3. Insert the ticket body
 */
const userModel = require("../models/user.model");
