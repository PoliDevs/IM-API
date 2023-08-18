const employee = require('express').Router();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const {
  Employee, EmployeeType, Commerce, CommerceFact,
} = require('../../db');

employee.use(express.json());
employee.use(cors());
employee.use(
  express.urlencoded({
    extended: true,
  }),
);

employee.post('/employee', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      password,
      phone,
      address,
      birthDate,
      start,
      document,
      email,
      googleUser,
      facebookUser,
      twitterUser,
      photo,
      employeeType,
      commerce,
    } = req.body;
    const hash = bcrypt.hashSync(password, 10);
    // eslint-disable-next-line no-unused-vars
    const [employeeCreated, created] = await Employee.findOrCreate({
      where: {
        email: email.toLowerCase(),
      },
      defaults: {
        firstName: firstName.toLowerCase(),
        lastName,
        password: hash,
        phone,
        address,
        birthDate,
        start,
        document,
        email,
        googleUser,
        facebookUser,
        twitterUser,
        photo,
        employeeTypeId: employeeType
          ? (
            await EmployeeType.findOne({ where: { type: employeeType } })
          )?.id
          : null,
        commerceId: commerce
          ? (
            await Commerce.findOne({ where: { name: commerce } })
          )?.id
          : null,
      },
    });
    if (created) {
      res.status(200).send('Employee created');
    } else {
      res.status(422).send('Existing Employee ');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

employee.get('/all', async (req, res) => {
  try {
    const employ = await Employee.findAll({
      attributes: ['id', 'firstName', 'lastName', 'phone', 'address', 'birthDate', 'start', 'document', 'active', 'email', 'googleUser', 'facebookUser', 'twitterUser', 'validatedEmail', 'photo'],
      include: [
        {
          model: EmployeeType,
          attributes: ['id', 'type', 'detail', 'active'],
        },
        {
          model: Commerce,
          attributes: ['id', 'name', 'neighborhood', 'address', 'active'],
          include: [
            {
              model: CommerceFact,
              attributes: ['id', 'type', 'detail', 'active'],
            },
          ],
        },
      ],
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

employee.get('/all_active', async (req, res) => {
  try {
    const employ = await Employee.findAll({
      where: { active: true },
      attributes: ['id', 'firstName', 'lastName', 'phone', 'address', 'birthDate', 'start', 'document', 'active', 'email', 'googleUser', 'facebookUser', 'twitterUser', 'validatedEmail', 'photo'],
      include: [
        {
          model: EmployeeType,
          attributes: ['id', 'type', 'detail', 'active'],
        },
        {
          model: Commerce,
          attributes: ['id', 'name', 'neighborhood', 'address', 'active'],
          include: [
            {
              model: CommerceFact,
              attributes: ['id', 'type', 'detail', 'active'],
            },
          ],
        },
      ],
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

employee.get('/detail/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id && Number.isInteger(parseInt(id, 10))) {
      const employ = await Employee.findAll({
        where: { id: parseInt(id, 10) },
        attributes: ['id', 'firstName', 'lastName', 'phone', 'address', 'birthDate', 'start', 'document', 'active', 'email', 'googleUser', 'facebookUser', 'twitterUser', 'validatedEmail', 'photo'],
        include: [
          {
            model: EmployeeType,
            attributes: ['id', 'type', 'detail', 'active'],
          },
          {
            model: Commerce,
            attributes: ['id', 'name', 'neighborhood', 'address', 'active'],
            include: [
              {
                model: CommerceFact,
                attributes: ['id', 'type', 'detail', 'active'],
              },
            ],
          },
        ],
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

employee.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      password,
      phone,
      address,
      birthDate,
      start,
      document,
      email,
      googleUser,
      facebookUser,
      twitterUser,
      photo,
      employeeType,
      commerce,
    } = req.body;
    const hash = bcrypt.hashSync(password, 10);
    const employeeFinded = await Employee.findOne({
      where: { id },
    });
    if (employeeFinded) {
      await employeeFinded.update({
        firstName: firstName.toLowerCase(),
        lastName,
        password: hash,
        phone,
        address,
        birthDate,
        start,
        document,
        email,
        googleUser,
        facebookUser,
        twitterUser,
        photo,
        employeeTypeId: employeeType
          ? (
            await EmployeeType.findOne({ where: { type: employeeType } })
          )?.id
          : null,
        commerceId: commerce
          ? (
            await Commerce.findOne({ where: { name: commerce } })
          )?.id
          : null,
      });
      res.status(200).send('The data was modified successfully');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

employee.put('/validated/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const employeeFinded = await Employee.findOne({
      where: { id },
    });
    if (employeeFinded) {
      await employeeFinded.update({
        validatedEmail: true,
      });
      res.status(200).send('Validated');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

employee.put('/unvalidated/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const employeeFinded = await Employee.findOne({
      where: { id },
    });
    if (employeeFinded) {
      await employeeFinded.update({
        validatedEmail: false,
      });
      res.status(200).send('Unvalidated');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

employee.put('/active/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const employeeFinded = await Employee.findOne({
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

employee.put('/inactive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const employeeFinded = await Employee.findOne({
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

employee.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = employee;
