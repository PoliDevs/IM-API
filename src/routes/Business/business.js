const business = require("express").Router();
const express = require("express");
const { Business } = require("../../db");
const cors = require("cors");


business.use(express.json());
business.use(cors());
// business.use(
//   express.urlencoded({
//     extended: true,
//   })
// );

business.post("/", async (req, res) => {
  try {
    const { name, ssn, detail, email, businessTypeId } = req.body;
    console.log(name, ssn, detail, email, businessTypeId )
    const [businessCreated, created] = await Business.findOrCreate({
      where: {
        name: name.toLowerCase(),
      },
      defaults: {
        name: name.toLowerCase(),
        ssn: ssn,
        detail:detail,
        email: email,
        businessTypeId:businessTypeId
      },
    });
    if (created) {
      res.status(200).send("Business created");
    } else {
      res.status(422).send("Existing Business ");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});


module.exports = business;
