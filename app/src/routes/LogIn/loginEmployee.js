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
  Payment,
} = require('../../db');

login.use(express.json());
login.use(cors());
login.use(
  express.urlencoded({
    extended: true,
  }),
);

login.post('/login', async (req, res) => {
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
      const tokenBack = jwt.sign({ id: employeeFound.id }, process.env.TOKENKEY, {
        expiresIn: '3h',
      });
        // COOKIE BACKEND
      res.cookie('employeeBackend', tokenBack, {
        expires: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 horas de expiración
        httpOnly: true, // Protege contra ataques de secuestro de cookies
        secure: true, // Requiere HTTPS para enviar la cookie (si tu aplicación utiliza HTTPS)
        // Agregar otras opciones de seguridad según sea necesario
      });
      // COOKIE FRONTEND
      res.cookie(
        'SessionEmployeeImenu',
        { employeeId: employeeInfo.id },
        {
          expires: new Date(Date.now() + 3 * 60 * 60 * 1000),
          httpOnly: true,
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

login.post('/loginG', async (req, res) => {
  try {
    const { googleUser } = req.body;
    const employeeFound = await Employee.findOne({
      where: {
        googleUser,
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
            {
              model: Payment,
              attributes: ['id', 'publicKey', 'accesToken', 'alias'],
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
    const employeeInfo = {
      id: employeeFound.id,
      firstName: employeeFound.firstName,
      lastName: employeeFound.lastName,
      addres: employeeFound.addres,
      bithDate: employeeFound.bithDate,
      start: employeeFound.start,
      googleUser: employeeFound.googleUser,
      EmployeeType: {
        id: employeeFound['employeeType.id'],
        type: employeeFound['employeeType.type'],
        detail: employeeFound['employeeType.detail'],
      },
      Commerce: {
        name: employeeFound['commerce.name'],
        neighborhood: employeeFound['commerce.neighborhood'],
        address: employeeFound['commerce.address'],
      },
    };
    const tokenFront = jwt.sign(employeeFound, process.env.TOKENKEY, {
      expiresIn: '3h',
    });
    const tokenBack = jwt.sign({ id: employeeFound.id }, process.env.TOKENKEY, {
      expiresIn: '3h',
    });
      // COOKIE BACKEND
    res.cookie('employeeBackend', tokenBack, {
      expires: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 horas de expiración
      httpOnly: true, // Protege contra ataques de secuestro de cookies
      secure: true, // Requiere HTTPS para enviar la cookie (si tu aplicación utiliza HTTPS)
      // Agregar otras opciones de seguridad según sea necesario
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
  } catch (error) {
    res.status(400).send(error);
  }
  return true;
});

login.post('/loginG_2', async (req, res) => {
  try {
    const { googleUser } = req.body;
    const employeeFound = await Employee.findAll({
      where: {
        googleUser,
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
    const employeeInfo = [];
    employeeFound.forEach((element) => {
      employeeInfo.push({
        id: element.id,
        firstName: element.firstName,
        lastName: element.lastName,
        addres: element.addres,
        bithDate: element.bithDate,
        start: element.start,
        googleUser: element.googleUser,
        EmployeeType: {
          id: element['employeeType.id'],
          type: element['employeeType.type'],
          detail: element['employeeType.detail'],
        },
        Commerce: {
          name: element['commerce.name'],
          neighborhood: element['commerce.neighborhood'],
          address: element['commerce.address'],
        },
      });
    });

    const employeeInfoString = JSON.stringify(employeeInfo);
    const tokenFront = jwt.sign({ employeeInfo: employeeInfoString }, process.env.TOKENKEY, {
      expiresIn: '3h',
    });
    const tokenBack = jwt.sign({ employeeInfo: employeeInfoString }, process.env.TOKENKEY, {
      expiresIn: '3h',
    });
      // COOKIE BACKEND
    res.cookie('employeeBackend', tokenBack, {
      expires: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 horas de expiración
      httpOnly: true, // Protege contra ataques de secuestro de cookies
      secure: true, // Requiere HTTPS para enviar la cookie (si tu aplicación utiliza HTTPS)
      // Agregar otras opciones de seguridad según sea necesario
    });

    // COOKIE FRONTEND
    res.cookie(
      'SessionEmployeeImenu',
      { employeeInfo },
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
  } catch (error) {
    res.status(400).send(error);
  }
  return true;
});

// RUTA SOLO PARA PROBAR LECTURA DE COOKIE con jwt.verify
login.get('/cookieBackendRead', (req, res) => {
  try {
    // eslint-disable-next-line no-console
    console.log('req.cookies', req.cookies);
    const token = req.cookies.employeeBackend;
    const decoded = jwt.verify(token, process.env.TOKENKEY);

    // eslint-disable-next-line no-console
    console.log('decoded', decoded);

    res.status(200).json({
      message: 'Cookie read',
    });
  } catch (e) {
    res.status(401).json({
      error: e,
    });
  }
});

login.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = login;
