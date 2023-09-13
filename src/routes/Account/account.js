const account = require('express').Router();
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { Account } = require('../../db');

account.use(express.json());
account.use(cors());
account.use(
  express.urlencoded({
    extended: true,
  }),
);

account.post('/account', async (req, res) => {
  try {
    const {
      name,
      password,
      phone,
      address,
      birthDate,
      email,
      googleUser,
      facebookUser,
      twitterUser,
      sex,
      neighborhood,
    } = req.body;
    const hash = bcrypt.hashSync(password, 10);
    // eslint-disable-next-line no-unused-vars
    const [acctionCreated, created] = await Account.findOrCreate({
      where: {
        email: email.toLowerCase(),
      },
      defaults: {
        name: name.toLowerCase(),
        password: hash,
        phone,
        address: address.toLowerCase(),
        birthDate,
        email: email.toLowerCase(),
        googleUser: googleUser.toLowerCase(),
        facebookUser: facebookUser.toLowerCase(),
        twitterUser: twitterUser.toLowerCase(),
        sex,
        neighborhood,
      },
    });
    if (created) {
      res.status(200).send('Account created');
    } else {
      res.status(422).send('Existing Account ');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

account.get('/all', async (req, res) => {
  try {
    const acco = await Account.findAll({
      attributes: ['id', 'name', 'password', 'phone', 'address', 'birthDate', 'status', 'email', 'googleUser', 'facebookUser', 'twitterUser', 'validatedEmail', 'sex', 'neighborhood'],
    });

    if (acco.length > 0) {
      res.status(201).json(acco);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

account.get('/all_Active', async (req, res) => {
  try {
    const acco = await Account.findAll({
      where: { status: 'active' },
      attributes: ['id', 'name', 'password', 'phone', 'address', 'birthDate', 'status', 'email', 'googleUser', 'facebookUser', 'twitterUser', 'validatedEmail', 'sex', 'neighborhood'],
    });

    if (acco.length > 0) {
      res.status(201).json(acco);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

account.get('/all_NoActive', async (req, res) => {
  try {
    const acco = await Account.findAll({
      where: { status: 'noActive' },
      attributes: ['id', 'name', 'password', 'phone', 'address', 'birthDate', 'status', 'email', 'googleUser', 'facebookUser', 'twitterUser', 'validatedEmail', 'sex', 'neighborhood'],
    });

    if (acco.length > 0) {
      res.status(201).json(acco);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

account.get('/all_banned', async (req, res) => {
  try {
    const acco = await Account.findAll({
      where: { status: 'banned' },
      attributes: ['id', 'name', 'password', 'phone', 'address', 'birthDate', 'status', 'email', 'googleUser', 'facebookUser', 'twitterUser', 'validatedEmail', 'sex', 'neighborhood'],
    });

    if (acco.length > 0) {
      res.status(201).json(acco);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

account.get('/detail/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id && Number.isInteger(parseInt(id, 10))) {
      const acco = await Account.findAll({
        where: { id: parseInt(id, 10) },
        attributes: ['id', 'name', 'password', 'phone', 'address', 'birthDate', 'status', 'email', 'googleUser', 'facebookUser', 'twitterUser', 'validatedEmail', 'sex', 'neighborhood'],
      });
      if (acco.length > 0) {
        res.status(201).json(acco);
      } else {
        res.status(422).json('Not found');
      }
    } else {
      res.status(422).send('ID was not provided');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

account.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      password,
      phone,
      address,
      birthDate,
      status,
      googleUser,
      facebookUser,
      twitterUser,
      validatedEmail,
      sex,
      neighborhood,
    } = req.body;
    const hash = bcrypt.hashSync(password, 10);
    const accountFinded = await Account.findOne({
      where: { id },
    });
    if (accountFinded) {
      await accountFinded.update({
        name: name.toLowerCase(),
        password: hash,
        phone,
        address: address.toLowerCase(),
        birthDate,
        status,
        googleUser: googleUser.toLowerCase(),
        facebookUser: facebookUser.toLowerCase(),
        twitterUser: twitterUser.toLowerCase(),
        validatedEmail,
        sex,
        neighborhood,
      });
      res.status(200).send('The data was modified successfully');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

account.put('/active/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const accountFinded = await Account.findOne({
      where: { id },
    });
    if (accountFinded) {
      await accountFinded.update({
        status: 'active',
      });
      res.status(200).send('Active');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

account.put('/inactive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const accountFinded = await Account.findOne({
      where: { id },
    });
    if (accountFinded) {
      await accountFinded.update({
        status: 'noActive',
      });
      res.status(200).send('Inactive');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

account.put('/banned/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const accountFinded = await Account.findOne({
      where: { id },
    });
    if (accountFinded) {
      await accountFinded.update({
        status: 'banned',
      });
      res.status(200).send('Banned');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

account.put('/emailChange/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { emailNew } = req.body;
    const accountFinded = await Account.findOne({
      where: { id },
    });
    if (accountFinded) {
      await Account.update({
        email: emailNew,
        validatedEmail: 0,
      });
      res.status(200).send('The email was modified successfully');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

account.put('/validated/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const accountFinded = await Account.findOne({
      where: { id },
    });
    if (accountFinded) {
      await accountFinded.update({
        validatedEmail: true,
      });
      res.status(200).send('Validated Email');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

account.put('/invalidated/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const accountFinded = await Account.findOne({
      where: { id },
    });
    if (accountFinded) {
      await accountFinded.update({
        validatedEmail: false,
      });
      res.status(200).send('No Validated Email');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

account.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = account;
