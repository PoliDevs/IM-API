const login = require('express').Router();
const express = require('express');
const cors = require('cors');

const bcrypt = require('bcrypt');
// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const {
  Employee,
  EmployeeType,
  Commerce,
  CommerceFact,
  CommercialPlan,
} = require('../../db');

login.use(express.json());
login.use(cors());
login.use(
  express.urlencoded({
    extended: true,
  }),
);

login.get('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const employeeFound = await Employee.findOne({
      where: {
        email,
      },
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
            {
              model: CommercialPlan,
              attributes: ['id', 'plan'],
            },
          ],
        },
      ],
      raw: true,
    });

    if (!employeeFound) {
      return res.status(401).json({
        error: 'Employee not found',
      });
    }

    if (employeeFound.active === 0) {
      return res.status(401).json({ error: 'Employee is inactive' });
    }
    if (employeeFound.validatedEmail === 0) {
      return res
        .status(401)
        .json({ error: 'Employee email is not validated', id: employeeFound.id });
    }

    bcrypt.compare(password, employeeFound.password, (err, result) => {
      if (err) {
        return res.status(401).json({
          error: 'Error checking password',
        });
      }
      if (!result) {
        return res.status(401).json({ error: 'Wrong password' });
      }
      const employeeInfo = {
        id: employeeFound.id,
        firstName: employeeFound.firstName,
        lastName: employeeFound.lastName,
        addres: employeeFound.addres,
        bithDate: employeeFound.bithDate,
        start: employeeFound.start,
        email: employeeFound.email,
        EmployeeType: {
          id: employeeFound['EmployeeType.id'],
          type: employeeFound['EmployeeType.type'],
          detail: employeeFound['EmployeeType.detail'],
        },
        Commerce: {
          name: employeeFound['Commerce.name'],
          neighborhood: employeeFound['Commerce.neighborhood'],
          address: employeeFound['Commerce.address'],
        },
      };
      const tokenFront = jwt.sign(employeeFound, process.env.TOKENKEY, {
        expiresIn: '3h',
      });
        // COOKIE FRONTEND
      res.cookie(
        'SessionEmployeeImenu',
        { employeeId: employeeInfo.id },
        {
          expires: new Date(Date.now() + 3 * 60 * 60 * 1000),
          httpOnly: false,
        },
      );
      res.status(200).json({
        message: 'Login success',
        token: tokenFront,
        // userInformation: userInfoFront,
      });
      return true;
    });
  } catch (error) {
    res.status(400).send(error);
  }
  return true;
});

login.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = login;
