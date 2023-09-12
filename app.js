const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require("mongoose");
const dotenv = require('dotenv')
const Person = require("./model/Person");
const { ObjectId } = require("bson");
dotenv.config()
const App = express();

app.use(cors());
app.options("*", cors());

App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(process.env.MongoDB, {
  useNewURLParser: true,
});

App.post("/api", async (req, res, next) => {
  try {
    const name = req.body.name;
    const person = new Person({
      name,
    });
    const personData = await person.save();
    return res.status(200).json(personData);
  } catch (error) {
    return res.status(400).json(error);
  }
});
App.get("/api/:user_id", async (req, res, next) => {
  try {
    const id = req.params.user_id
    if (!ObjectId.isValid(id)){
      return res.status(400).json('Invalid Request Parameter')
    }
    const person = await Person.findById(id);
    if (!person._id){
      return res.status(404).json('Not Found');
    }
    return res.status(200).json(person);
  } catch (error) {
    return res.status(400).json(error.message);
  }
});
App.put("/api/:user_id", async (req, res, next) => {
  try {
    const id = req.params.user_id
    if (!ObjectId.isValid(id)){
      return res.status(400).json('Invalid Request Parameter')
    }
    const person = await Person.findById(id);
    if (!person._id){
      return res.status(404).json('Not Found');
    }
    await person.set({
      name: req.body.name
    })
    const response = await person.save()
    return res.status(200).json(response)
  } catch (error) {
    return res.status(400).json(error.message);
  }
});
App.delete("/api/:user_id", async (req, res, next) => {
  try {
    const id = req.params.user_id
    if (!ObjectId.isValid(id)){
      return res.status(400).json('Invalid Request Parameter')
    }
    await Person.findByIdAndDelete(id);
    return res.status(200).json('User deleted Successfully')
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

module.exports = App;
