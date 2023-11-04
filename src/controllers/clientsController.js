const express = require("express");

const Client = require("../models/clientsModel.js");

const router = express.Router();

// register new appointment. If client exists (by email), add appointment to him, if not, creates new client.
router.post("/registerAppointment", async (req, res) => {
  try {
    const clientName = req.body.firstName;
    const clientLastName = req.body.lastName;
    const clientEmail = req.body.clientEmail;
    const appointmentDate = new Date(req.body.date);
    const appointmentService = req.body.service;
    const utcPlus2Date = new Date(
      appointmentDate.getTime() + 2 * 60 * 60 * 1000
    );

    let client = await Client.findOne({ clientEmail: clientEmail });

    if (!client) {
      client = new Client({
        firstName: clientName,
        lastName: clientLastName,
        clientEmail: clientEmail,
      });
    }

    const newAppointment = {
      date: utcPlus2Date,
      service: appointmentService,
    };
    client.appointments.push(newAppointment);

    await client.save();

    res
      .status(201)
      .send({ message: "Client appointment was successfully registered." });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// get all users with their appointments
router.get("/getClients", async (_, res) => {
  try {
    const clients = await Client.find();
    res.send(clients);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// update appointment. Delete it or change date
router.put("/updateAppointment/:clientId/:appointmentId", async (req, res) => {
  try {
    const { clientId, appointmentId } = req.params;
    const { action, date } = req.body;

    const client = await Client.findById(clientId);

    if (!client) {
      return res.status(404).send({ message: "Client not found." });
    }

    const appointmentIndex = client.appointments.findIndex(
      (appointment) => appointment.id === appointmentId
    );

    if (appointmentIndex === -1) {
      return res.status(404).send({ message: "Appointment not found." });
    }

    if (action === "delete") {
      client.appointments.splice(appointmentIndex, 1);
    } else if (action === "updateDate") {
      client.appointments[appointmentIndex].date = date;
    } else {
      return res
        .status(400)
        .send({ message: "Invalid action. Use 'delete' or 'updateDate'." });
    }

    await client.save();

    res.status(200).send({ message: "Appointment updated." });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;
