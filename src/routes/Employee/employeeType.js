const employeeType = require('express').Router();
const express = require('express');
const cors = require('cors');
const { EmployeeType } = require('../../db');

employeeType.use(express.json());
employeeType.use(cors());
employeeType.use(
  express.urlencoded({
    extended: true,
  }),
);

employeeType.post('/type', async (req, res) => {
  try {
    const { type, detail } = req.body;
    // eslint-disable-next-line no-unused-vars
    const [employeeTypeCreated, created] = await EmployeeType.findOrCreate({
      where: {
        type: type.toLowerCase(),
      },
      defaults: {
        type: type.toLowerCase(),
        detail,
      },
    });
    if (created) {
      res.status(200).send('EmployeeType created');
    } else {
      res.status(422).send('Existing EmployeeType ');
    }
  } catch (error) {
    res.send(error);
  }
});

employeeType.get('/all', async (req, res) => {
  try {
    const employ = await EmployeeType.findAll({
      attributes: ['id', 'type', 'detail', 'active'],
    });

    if (employ.length > 0) {
      res.status(201).json(employ);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.send(error);
  }
});

employeeType.get('/all_active', async (req, res) => {
  try {
    const employ = await EmployeeType.findAll({
      where: { active: true },
      attributes: ['id', 'type', 'detail', 'active'],
    });

    if (employ.length > 0) {
      res.status(201).json(employ);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.send(error);
  }
});

employeeType.get('/detail/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id && Number.isInteger(parseInt(id, 10))) {
      const employ = await EmployeeType.findAll({
        where: { id: parseInt(id, 10) },
        attributes: ['id', 'type', 'detail', 'active'],
      });
      if (employ.length > 0) {
        res.status(201).json(employ);
      } else {
        res.status(422).json('Not found');
      }
    } else {
      res.status(422).send('ID was not provided');
    }
  } catch (error) {
    res.send(error);
  }
});

employeeType.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { type, detail } = req.body;
    const employeeFinded = await EmployeeType.findOne({
      where: { id },
    });
    if (employeeFinded) {
      await employeeFinded.update({
        type,
        detail,
      });
      res.status(200).send('The data was modified successfully');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

employeeType.put('/active/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const employeeFinded = await EmployeeType.findOne({
      where: { id },
    });
    if (employeeFinded) {
      await employeeFinded.update({
        active: true,
      });
      res.status(200).send('Active');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

employeeType.put('/inactive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const employeeFinded = await EmployeeType.findOne({
      where: { id },
    });
    if (employeeFinded) {
      await employeeFinded.update({
        active: false,
      });
      res.status(200).send('Inactive');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

employeeType.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = employeeType;
