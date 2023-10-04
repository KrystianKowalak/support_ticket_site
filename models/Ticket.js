// NOT DONE

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const Log = require('./Log');

class Ticket extends Model {}

Ticket.init(
    {
      clientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        }
      },
      techId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        }
      },
      subject: {
        type: DataTypes.STRING,
      }
    }
);

class Log {
    constructor(userId, ticketId, type, message, date) {
      this.userId = userId;
      this.ticketId = ticketId;
      this.type = type;
      this.message = message;
      this.date = date;
    }
};
  
class Ticket {
    constructor(id, data) {
      this.id = id;
      this.data = data;
    }
  
    // Helper method to find differences between oldData and current data
    findDiff(oldData) {
      const changes = [];
      for (const key in this.data) {
        if (this.data[key] !== oldData[key]) {
          changes.push({ field: key, oldValue: oldData[key], newValue: this.data[key] });
        }
      }
      return changes;
    }
  
    // Method to log changes to the Ticket
    logChange(userId, oldData) {
      const changes = this.findDiff(oldData);
  
      // If no changes are found, return early
      if (changes.length === 0) {
        return;
      }
  
      const currentDate = new Date();
      const message = `${changes.length} changes were made on ${currentDate} by ${userId}. Iterate the results of findDiff here`;
  
      const logEntry = new Log(userId, this.id, 'Modified', message, currentDate);
  
      // Assuming you have a mechanism to store or display the log entry
      console.log('Log Entry:', logEntry);
    }
};
  
  // Example usage
  const initialData = {
    title: 'Ticket Title',
    description: 'Ticket Description',
    status: 'Open',
  };
  
  const ticket = new Ticket(1, initialData);
  
  // Simulate a change in the ticket data
  const newData = {
    title: 'Updated Ticket Title',
    description: 'Updated Ticket Description',
    status: 'Closed',
  };
  
  ticket.logChange('user123', initialData); // This should log the change
  ticket.data = newData;
  ticket.logChange('user456', initialData); // This should not log anything since no changes were made
  
  