const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
});

const clientSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  clientEmail: {
    type: String,
    required: true,
  },
  appointments: [appointmentSchema],
});

module.exports = mongoose.model("clients", clientSchema);
