const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Person = require("./model/Person");
const { ObjectId } = require("bson");
dotenv.config();
const App = express();

App.use(cors());
App.options("*", cors());

App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(process.env.MongoDB, {
  useNewURLParser: true,
});

App.post("/api", async (req, res, next) => {
  try {
    const bodyName = req.body.name;
    if (bodyName === undefined || bodyName.trim() === ""){
      return res.status(400).json('Invalid Body');
    }
    const person = new Person({
      name: bodyName
    });
    const personData = await person.save();
    const { _id, name } = personData;
    return res.status(200).json({ _id, name });
  } catch (error) {
    return res.status(400).json(error);
  }
});
App.get("/api/:user_id", async (req, res, next) => {
  try {
    const id = req.params.user_id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json("Invalid Request Parameter");
    }
    const person = await Person.findById(id);
    if (!person) {
      return res.status(404).json("Not Found");
    }
    const { _id, name } = person;
    return res.status(200).json({ _id, name });
  } catch (error) {
    return res.status(400).json(error.message);
  }
});
App.put("/api/:user_id", async (req, res, next) => {
  try {
    const id = req.params.user_id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json("Invalid Request Parameter");
    }
    const person = await Person.findById(id);
    if (!person) {
      return res.status(404).json("Not Found");
    }
    await person.set({
      name: req.body.name,
    });
    const response = await person.save();
    const { _id, name } = response;
    return res.status(200).json({ _id, name });
  } catch (error) {
    return res.status(400).json(error.message);
  }
});
App.delete("/api/:user_id", async (req, res, next) => {
  try {
    const id = req.params.user_id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json("Invalid Request Parameter");
    }
    const person = await Person.findByIdAndDelete(id);
    if (!person) {
      return res.status(404).json("Not Found");
    }
    const { _id, name } = person;
    return res.status(200).json({ _id, name });
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

module.exports = App;
