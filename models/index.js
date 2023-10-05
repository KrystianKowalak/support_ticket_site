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
    foreignKey: "techId",
});
Ticket.belongsTo(User, {
    foreignKey: "clientID",
    foreignKey: "techId",
});
/*
Log to User
    User has many Log
    Log belongs to a User
    Foreign key definition of "userId"
*/
User.hasMany(Log, {
    foreignKey: "userId",
});
Log.belongsTo(User, {
    foreignKey: "userId",
});
/*
Log to Ticket
    Ticket has many Log
    Log belongs to Ticket
    Foreign key definition of "ticketId"
*/
Ticket.hasMany(Log, {
    foreignKey: "ticketId",
});
Log.belongsTo(Ticket, {
    foreignKey: "ticketId",
});

module.exports = { User, Log, Ticket };


//Do I need an onDelete: CASCADE or similar command anywhere here?