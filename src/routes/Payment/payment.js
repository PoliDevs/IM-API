const payment = require('express').Router();
const express = require('express');
const cors = require('cors');
const { Payment } = require('../../db');

payment.use(express.json());
payment.use(cors());
payment.use(
  express.urlencoded({
    extended: true,
  }),
);

payment.post('/', async (req, res) => {
  try {
    const { type, detail } = req.body;
    // eslint-disable-next-line no-unused-vars
    const [paymentCreated, created] = await Payment.findOrCreate({
      where: {
        type: type.toLowerCase(),
      },
      defaults: {
        type: type.toLowerCase(),
        detail,
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

payment.get('/all', async (req, res) => {
  try {
    const pay = await Payment.findAll({
      attributes: ['id', 'type', 'detail', 'active'],
    });

    if (pay.length > 0) {
      res.status(201).json(pay);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.send(error);
  }
});

payment.get('/all_active', async (req, res) => {
  try {
    const pay = await Payment.findAll({
      where: { active: true },
      attributes: ['id', 'type', 'detail', 'active'],
    });

    if (pay.length > 0) {
      res.status(201).json(pay);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.send(error);
  }
});

payment.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id && Number.isInteger(parseInt(id, 10))) {
      const pay = await Payment.findAll({
        where: { id: parseInt(id, 10) },
        attributes: ['id', 'type', 'detail', 'active'],
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
    res.send(error);
  }
});

payment.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { type, detail } = req.body;
    const paymentFinded = await Payment.findOne({
      where: { id },
    });
    if (paymentFinded) {
      await paymentFinded.update({
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

payment.put('/active/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const paymentFinded = await Payment.findOne({
      where: { id },
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
      where: { id },
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

module.exports = payment;
