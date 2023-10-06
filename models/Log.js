const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Log extends Model {}

Log.init(
  {
/*
    ├── userId
│   ├── INTEGER
│   ├── Required
│   ├── Foreign key which references `user`.`id`
*/
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      }
    },

/*
├── ticketId
│   ├── INTEGER
│   ├── Required
│   ├── Foreign key which references `ticket`.`id`
*/
    ticketId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "user",
            key: "id",
        }
      },

/*
├── message
│   ├── STRING
│   ├── Required
*/
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },

/*
├── type
│   ├── STRING
│   ├── Required
│   ├── Default value will be "Message"
│   ├── Must be "Created", "Modified", or "Message"
*/
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Message",
        validate: {
            isIn: {
              args: [["Created", "Modified", "Message"]],
              msg: 'Status must be "Created", "Modified", or "Message"',
            },
          },
      },
/*
├── isHidden
│   ├── BOOLEAN
│   ├── Required
│   ├── Default value of `false`
*/
    isHidden: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
    },
  },
  {
    sequelize,
    modelName: 'log',
    timestamps: false,
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = Log;

