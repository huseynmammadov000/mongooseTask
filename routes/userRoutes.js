

const express = require("express")
const router = express.Router();
const User = require("../models/user");

router.post("/create", async (req, res) => {
   
    const { username, firstname, lastname } = req.body;
    const newUser = new User({
        username,
        firstname,
        lastname
    });

    await newUser.save();
    res.status(201).json(newUser);

});


module.exports = router;