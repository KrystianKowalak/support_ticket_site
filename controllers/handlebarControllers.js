const { Ticket, User, Log } = require("../models");

const {
    login,
    editLog,
    deleteLog
} = require("../../controllers/logControllers")

module.exports = {
  showLogin: async function (req, res)  {
    try {
      if(req.session.loggedIn) {
        res.status(401).redirect("/");
      } else {
        res.render("login", {layout: "login.handlebars"});
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  showDashboard: async function (req, res)  {
    try {
      const status = req.params.status || "";
      switch (status) {
        case "Open":
            break;
        case "Pending":
            break;
        case "Resolved":
            break;
        case "Claimed":
            break;
        case "":
            break;
        default:
            console.log("Outside switch statment options!");
            process.exit(0);
    }
        if(req.session.role == "client") {
          const ticketClientData = await Ticket.findAll({
            where: {
              clientId: req.session.id,
              isArchived: false
            },
            include: [{
              model: User,
              attributes: ["id", "firstName", "lastName", "role"]
            }]
          })
          if (ticketClientData.length == 0) {
            res.status(404).json({message: "No tickets found for this client"})
          }
        }
        if(req.session.role == "tech") {
          const ticketTechData = await Ticket.findAll({
            where: {
              techId: req.session.id,
              isArchived: false
            },
            include: [{
              model: User,
              attributes: ["id", "firstName", "lastName", "role"]
            }]
          })
          if (ticketTechData.length == 0) {
            res.status(404).json({message: "No tickets found for this tech"})
          }
        }

      res.render("home", {layout: "main.handlebars", title: "Dashboard", userType: req.session.role, loggedIn: req.session.loggedIn});
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
    }
    // showDashboard: async function (req, res) => {
    //     try {
    //       const status = req.params.status || '';
    //       console.log(status);
    //       if (status === "Open" || status === "Pending") {
    //         const ticketData = await Ticket.findAll({
    //           where: {
    //             status: req.params.status,
    //             isArchived: false,
    //           },
    //           include: [
    //             {
    //               model: User, 
    //               attributes: ["id", "role"]
    //             }
    //           ]
    //         })
    //         console.log(ticketData);
    //         if (ticketData.length === 0) {
    //           res.status(404).json({ message: "Ticket does not exist" })
    //         }
    //         res.status(200).json(ticketData);
    //       }
    //       else if (status === "Resolved") {
    //         const ticketData = await Ticket.findAll({
    //           where: {
    //             status: req.params.status,
    //           },
    //           include: [
    //             {
    //               model: User,
    //               attributes: ["id", "role"]
    //             }
    //           ]
    //         })
    //         console.log(ticketData);
    //         if (ticketData.length === 0) {
    //           res.status(404).json({ message: "Ticket does not exist" })
    //         }
    //         res.status(200).json(ticketData);
    //       }
    //       else {
    //         const ticketData = await Ticket.findAll({
    //           include: [{
    //             model: User,
    //             attributes: ["id", "role"]
    //           }]
    //         });
    //         console.log(ticketData);
    //         if (ticketData.length === 0) {
    //           res.status(404).json({ message: "Ticket does not exist" })
    //         }
    //         res.status(200).json(ticketData);
    //       }
      
    //     } catch (err) {
    //       res.status(500).json(err);
    //     }
    //   };
};