/**
 *
 */
const Client = require("node-rest-client").Client;
const client = new Client();

module.exports = (subject, content, recepients, requester) => {
  /**
   * Send a POST request to the notification
   */
  /**
   * Request Body
   */
  const reqBody = {
    subject: subject,
    recepientEmails: recepients,
    content: content,
    requester: requester,
  };
  /**
   * Request Header
   */
  const reqHeader = {
    "Content-Type": "application/json",
  };
  const args = {
    data: reqBody,
    header: reqHeader,
  };
  /**
   * Do the post call
   */
  client.post(
    "http://localhost:8080/notiserv/api/v1/notifications",
    args,
    (data, res) => {
      console.log("Request sent");
      console.log(data);
    }
  );
};
