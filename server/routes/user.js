const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user');
const cors = require('cors');


router.use(cors());

router.get('/', (req, res) => {
    res.send("user")
})

router.post('/register', async (req, res) => {
    var { email, phone, username, address } = req.body;
    // check for missing filds
    if (!phone || !username || !address) {
        res.status(400).send({ msg: "Please enter all the fields" })
        return;
    };
    var user = username.charAt(0).toUpperCase() + username.slice(1);

    const doesUserExitsAlreay = await User.findOne({ phone });
    if (doesUserExitsAlreay) {
        res.status(400).send({ msg: "Phone Number already exists" });
        return;
    };

    const doesUsernameExitsAlreay = await User.findOne({ username: user });
    if (doesUsernameExitsAlreay) {
        res.status(400).send({ msg: "Username already exists" });
        return;
    };

    // lets hash the password
    // const hashedPassword = await bcrypt.hash(password, 12);
    const latestUser = new User({ email, username: user, phone, address });

    latestUser
        .save()
        .then(() => {
            res.status(201).send({ msg: "Sucessfully Registered" });
            return;
        })
        .catch((err) => console.log(err));
});

router.post('/login', async (req, res) => {
    var { username, password } = req.body;

    // check for missing filds
    if (!username || !password) {
        res.send("Please enter all the fields");
        return;
    }
    username = username.charAt(0).toUpperCase() + username.slice(1);
    const doesUserExits = await User.findOne({ username });

    if (!doesUserExits) {
        res.send({ msg: "Invalid useranme or password" });
        return;
    }

    const doesPasswordMatch = await bcrypt.compare(
        password,
        doesUserExits.password
    );

    if (!doesPasswordMatch) {
        res.send({ msg: "Invalid useranme or password" });
        return;
    }
    res.send({ msg: "success", user: { username: username } });
})

module.exports = router;