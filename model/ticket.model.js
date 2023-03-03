/**
 * This file will contain the schema of the ticket model
 */
const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  ticketPriority: {
    type: Number,
    require: true,
    default: 4,
  },
  description: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
    default: ["OPEN"],
    enum: ["OPEN", "IN_PROGRESS", "CLOSED"],
  },
  reporter: {
    type: String,
    require: true,
  },
  assignee: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: () => {
      return Date.now();
    },
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: () => {
      return Date.now();
    },
  },
});
module.exports = mongoose.model("Ticket", ticketSchema);
