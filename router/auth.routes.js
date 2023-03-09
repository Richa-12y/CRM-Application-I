/**
 * This will have the logic to route the request to different controllers
 */

const authController = require("../controllers/auth.controller");

module.exports = (app) => {
  /**
   * Define the route for sign up
   *
   * POST /crm/api/v1/authsignup -> auth controller sign up method
   */
  app.post("/crm/api/v1/auth/signup", authController.signup);

  /**
   * Define the route for signin
   *
   * POST /crm/api/v1/authsignin -> auth controller sign in method
   */

  app.post("/crm/api/v1/auth/signin", authController.signin);
};
