const { Ticket, User, Log } = require('../models');

const {
    login,
    editLog,
    deleteLog
} = require("../../controllers/logControllers")

module.exports = {
    router.get('/login', async (req, res) => {
        try {
          const userData = await User.findOne({ where: { email: req.body.email } });
      
          if (!userData) {
            res.status(400)
              .json({ message: "Your email or password is incorrect, please try again." });
            return;
          }
      
          const checkPassword = await User.checkPassword(req.body.password);
      
          if (!checkPassword) {
            res.status(400)
              .json({ message: "Your email or password is incorrect, please try again." });
            return;
          }
      
          req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true;
            res.json({ user: userData, message: "Login Successful" });
          });
        } catch (err) {
          res.status(404).json(err);
        }
      })
      
      
      // Matches '/:status?' to handle GET calls.
      // Runs renderDashboard handlebars controller.
      router.get("/:status", async (req, res) => {
        try {
          const status = req.params.status || '';
          console.log(status);
      
          if (status === "Open" || status === "Pending") {
            const ticketData = await Ticket.findAll({
              where: {
                status: req.params.status,
                isArchived: false,
              },
              include: [
                {
                  model: User, 
                  attributes: ["id", "role"]
                }
              ]
            })
            console.log(ticketData);
            if (ticketData.length === 0) {
              res.status(404).json({ message: "Ticket does not exist" })
            }
            res.status(200).json(ticketData);
          }
          else if (status === "Resolved") {
            const ticketData = await Ticket.findAll({
              where: {
                status: req.params.status,
              },
              include: [
                {
                  model: User,
                  attributes: ["id", "role"]
                }
              ]
            })
            console.log(ticketData);
            if (ticketData.length === 0) {
              res.status(404).json({ message: "Ticket does not exist" })
            }
            res.status(200).json(ticketData);
          }
          else {
            const ticketData = await Ticket.findAll({
              include: [{
                model: User,
                attributes: ["id", "role"]
              }]
            });
            console.log(ticketData);
            if (ticketData.length === 0) {
              res.status(404).json({ message: "Ticket does not exist" })
            }
            res.status(200).json(ticketData);
          }
      
        } catch (err) {
          res.status(500).json(err);
        }
      });
};