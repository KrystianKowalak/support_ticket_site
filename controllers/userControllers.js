const { User } = require("../../models");

module.exports = {
    loginUser: async function (req, res) {
        try {
            const user = await User.findOne({
                where: {
                    email: req.body.email,
                },
        });

        if (!user) {
            res.status(400).json({message: "Incorrect email or password. Please try again!"});
            return;
        }

        const validPassword = await user.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({message: "Incorrect email or password. Please try again!"});
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json({user: user, message: "You are now logged in!"}).redirect('/');
        });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    logoutUser: async function (req, res) {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).redirect("/login").end();
        });
        } else {
            res.status(404).end();
        }
    }
};