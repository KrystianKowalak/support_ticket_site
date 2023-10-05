const router = require("express").Router();

const {
  showLogin,
  showDashboard,
  showTicket
} = require("../../controllers/handlebarControllers")

router.route('/login')
  .get(withAuth, showLogin);

router.route('/:status')
  .get(withAuth, showDashboard);

router.route('/ticket/:id')
  .get(withAuth, showTicket);

module.exports = router;