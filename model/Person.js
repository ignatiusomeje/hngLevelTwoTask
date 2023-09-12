const {Schema, model} = require('mongoose');

const personSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

const Person = model('Person', personSchema);
module.exports = Person;


