const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const Log = require("./Log.js"); 

class Ticket extends Model {}

Ticket.init(
  {

  },
);

module.exports = Ticket;
