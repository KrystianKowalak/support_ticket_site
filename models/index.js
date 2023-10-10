const User = require("./User");
const Log = require("./Log");
const Ticket = require("./Ticket");

User.hasMany(Ticket, {
    foreignKey: "clientId",
    as: "client",
    allowNull: false,
    onDelete: "CASCADE"
});
User.hasMany(Ticket, {
    foreignKey: "techId",
    as: "tech",
    allowNull: false,
    onDelete: "CASCADE"
});
Ticket.belongsTo(User, {
    foreignKey: "clientId",
    as: "client",
    allowNull: false,
    onDelete: "SET NULL"
});
Ticket.belongsTo(User, {
    foreignKey: "techId",
    as: "tech",
    allowNull: false,
    onDelete: "SET NULL"
});
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