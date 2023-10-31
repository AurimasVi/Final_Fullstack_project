const express = require("express");

const User = require("../models/userModel.js");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      await User.create(req.body);
      res.status(201).send({ message: "Account created." });
    } else {
      res.status(400).send({ message: "User with such email already exists." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (!user) {
      return res
        .status(400)
        .send({ message: "Email or password did not match. " });
    }

    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;
