const payment = require('express').Router();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { Payment } = require('../../db');

payment.use(express.json());
payment.use(cors());
payment.use(
  express.urlencoded({
    extended: true,
  }),
);

payment.post('/payment', async (req, res) => {
  try {
    const {
      type, detail, commerceId, publicKey, accesToken, alias,
    } = req.body;
    const hashPublicKey = bcrypt.hashSync(publicKey, 10);
    const hashAccesToken = bcrypt.hashSync(accesToken, 10);
    const hashAlias = bcrypt.hashSync(alias, 10);
    // eslint-disable-next-line no-unused-vars
    const [paymentCreated, created] = await Payment.findOrCreate({
      where: {
        type: type.toLowerCase(),
        commerceId,
      },
      defaults: {
        type: type.toLowerCase(),
        detail,
        commerceId,
        publicKey: hashPublicKey,
        accesToken: hashAccesToken,
        alias: hashAlias,
      },
    });
    if (created) {
      res.status(200).send('Payment created');
    } else {
      res.status(422).send('Existing Payment ');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

payment.get('/all/:commerceId', async (req, res) => {
  try {
    const { commerceId } = req.params;
    if (!commerceId && !Number.isInteger(parseInt(commerceId, 10))) {
      res.status(422).send('ID was not provided');
    }
    const pay = await Payment.findAll({
      where: {
        commerceId: parseInt(commerceId, 10),
      },
      attributes: ['id', 'type', 'detail', 'commerceId', 'active', 'publicKey', 'accesToken', 'alias'],
    });

    if (pay.length > 0) {
      res.status(201).json(pay);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

payment.get('/all_active/:commerceId', async (req, res) => {
  try {
    const { commerceId } = req.params;
    if (!commerceId && !Number.isInteger(parseInt(commerceId, 10))) {
      res.status(422).send('ID was not provided');
    }
    const pay = await Payment.findAll({
      where: {
        commerceId: parseInt(commerceId, 10),
        active: true,
      },
      attributes: ['id', 'type', 'detail', 'commerceId', 'active', 'publicKey', 'accesToken', 'alias'],
    });

    if (pay.length > 0) {
      res.status(201).json(pay);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

payment.get('/detail/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id && Number.isInteger(parseInt(id, 10))) {
      const pay = await Payment.findAll({
        where: { id: parseInt(id, 10) },
        attributes: ['id', 'type', 'detail', 'commerceId', 'active', 'publicKey', 'accesToken', 'alias'],
      });
      if (pay.length > 0) {
        res.status(201).json(pay);
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

payment.put('/update/:id', async (req, res) => {
  try {
    const {
      id, commerceId, publicKey, accesToken, alias,
    } = req.params;
    const { type, detail } = req.body;
    const hashPublicKey = bcrypt.hashSync(publicKey, 10);
    const hashAccesToken = bcrypt.hashSync(accesToken, 10);
    const hashAlias = bcrypt.hashSync(alias, 10);
    const paymentFinded = await Payment.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (paymentFinded) {
      await paymentFinded.update({
        type,
        detail,
        commerceId,
        publicKey: hashPublicKey,
        accesToken: hashAccesToken,
        alias: hashAlias,
      });
      res.status(200).send('The data was modified successfully');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

payment.put('/active/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const paymentFinded = await Payment.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (paymentFinded) {
      await paymentFinded.update({
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

payment.put('/inactive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const paymentFinded = await Payment.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (paymentFinded) {
      await paymentFinded.update({
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

payment.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = payment;
