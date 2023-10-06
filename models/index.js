const User = require("./User");
const Log = require("./Log");
const Ticket = require("./Ticket");
/*
User to Ticket
    User has many references to Ticket
    Ticket belongs to a User
    Two foreign key definitions
    "clientId" as "client"
    "techId` as "tech"
*/
User.hasMany(Ticket, {
    foreignKey: "clientId",
    as: "client",
    foreignKey: "techId",
    as: "tech",
    allowNull: false,
    onDelete: "CASCADE"
});
Ticket.belongsTo(User, {
    foreignKey: "clientID",
    as: "client",
    foreignKey: "techId",
    as: "tech",
    allowNull: false,
    onDelete: "SET NULL"
});
/*
Log to User
    User has many Log
    Log belongs to a User
    Foreign key definition of "userId"
*/
User.hasMany(Log, {
    foreignKey: "userId",
    allowNull: false,
    onDelete: "CASCADE"
});
Log.belongsTo(User, {
    foreignKey: "userId",
    allowNull: false,
    onDelete: "SET NULL"
});
/*
Log to Ticket
    Ticket has many Log
    Log belongs to Ticket
    Foreign key definition of "ticketId"
*/
Ticket.hasMany(Log, {
    foreignKey: "ticketId",
    allowNull: false,
    onDelete: "CASCADE"
});
Log.belongsTo(Ticket, {
    foreignKey: "ticketId",
    allowNull: false,
    onDelete: "SET NULL"
});

module.exports = { User, Log, Ticket };