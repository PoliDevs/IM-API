const login = require('express').Router();
const express = require('express');
const cors = require('cors');

const bcrypt = require('bcrypt');
// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const {
  Account,
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
    const accountFound = await Account.findOne({
      where: {
        email,
      },
      raw: true,
    });

    if (!accountFound) {
      return res.status(401).json({
        error: 'Account not found',
      });
    }

    if (accountFound.status === 'noActive') {
      return res.status(401).json({ error: 'Account is inactive' });
    }
    if (accountFound.validatedEmail === 0) {
      return res
        .status(401)
        .json({ error: 'Account email is not validated', id: accountFound.id });
    }

    bcrypt.compare(password, accountFound.password, (err, result) => {
      if (err) {
        return res.status(401).json({
          error: 'Error checking password',
        });
      }
      if (!result) {
        return res.status(401).json({ error: 'Wrong password' });
      }
      const accountInfo = {
        id: accountFound.id,
        name: accountFound.name,
        phone: accountFound.phone,
        address: accountFound.address,
        birthDate: accountFound.birthDate,
        email: accountFound.email,
      };
      const tokenFront = jwt.sign(accountFound, process.env.TOKENKEY, {
        expiresIn: '3h',
      });
        // COOKIE FRONTEND
      res.cookie(
        'SessionAccountImenu',
        { accountId: accountInfo.id },
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
