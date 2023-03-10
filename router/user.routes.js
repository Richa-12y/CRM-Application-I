/**
 * This will be the routes files for the user resource
 */
const userController = require("../controllers/user.controller");
const auth = require("../middlwares/authjwt");
module.exports = (app) => {
  /**
   * GET /crm/api/v1/users->user controller,findAll methode sholud be called
   *
   * we are going to patch chained middleware between route and controller
   */
  app.get(
    "/crm/api/v1/users",
    [auth.verifyToken, auth.isAdmin],
    userController.findAll
  );

  /**
   * Endpoint for updating the user
   *
   * PUT /crm/api/v1/users/vish01  - > user Controller , update method
   */
  //   app.put(
  //     "/crm/api/v1/users/:id",
  //     [auth.verifyToken, auth.isAdminOrOwner],
  //     userController.update
  //   );
};
