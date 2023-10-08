const employee = require('express').Router();
const express = require('express');
const cors = require('cors');
const {
  Employee,
} = require('../../db');

employee.use(express.json());
employee.use(cors());
employee.use(
  express.urlencoded({
    extended: true,
  }),
);

const loadEmployeer = async (commerceJSON, commerceId, employeeTypeId) => {
  let created;
  try {
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
    const dia = fechaActual.getDate().toString().padStart(2, '0');
    const fechaCorta = `${año}-${mes}-${dia}`;
    // eslint-disable-next-line no-unused-vars
    created = await Employee.create({
      firstName: commerceJSON[0].firstNameEmployeer,
      lastName: commerceJSON[0].lastNameEmployeer,
      email: commerceJSON[0].emailEmployeer,
      googleUser: commerceJSON[0].googleUserEmployeer,
      employeeTypeId,
      commerceId,
      validatedEmail: true,
      password: '',
      phone: '',
      address: '',
      birthDate: '',
      start: fechaCorta,
      document: '',
      facebookUser: '',
      twitterUser: '',
      photo: '',
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
  return created.id;
};

module.exports = {
  loadEmployeer,
};
