const logout = require('express').Router();
const express = require('express');
const cors = require('cors');

logout.use(express.json());
logout.use(cors());
logout.use(
  express.urlencoded({
    extended: true,
  }),
);

logout.get('/logout', (req, res) => {
  try {
    res.clearCookie('employeeBackend');
    res.clearCookie('SessionEmployeeImenu');
    res.status(200).json({
      message: 'Logout success',
    });
  } catch (e) {
    return res.status(401).json({
      error: e,
    });
  }
  return null;
});

logout.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = logout;
