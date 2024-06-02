const additional = require('express').Router();
const express = require('express');
const cors = require('cors');
const { Additional } = require('../../db');

additional.use(express.json());
additional.use(cors());
additional.use(
  express.urlencoded({
    extended: true,
  }),
);

additional.post('/additional', async (req, res) => {
  try {
    const {
      name, amount, cost, promotion, discount, photo, commerceId, surcharge,
    } = req.body;
    // eslint-disable-next-line no-unused-vars
    const [additionalCreated, created] = await Additional.findOrCreate({
      where: {
        name: name.toLowerCase(),
        commerceId,
      },
      defaults: {
        name: name.toLowerCase(),
        amount,
        cost,
        promotion,
        discount,
        surcharge,
        photo,
        commerceId,
      },
    });
    if (created) {
      res.status(200).send('Additional created');
    } else {
      res.status(422).send('Existing Additional ');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

additional.get('/all/:commerceId', async (req, res) => {
  try {
    const { commerceId } = req.params;
    if (!commerceId && !Number.isInteger(parseInt(commerceId, 10))) {
      res.status(422).send('ID was not provided');
    }
    const addi = await Additional.findAll({
      where: {
        commerceId: parseInt(commerceId, 10),
      },
      attributes: ['id', 'name', 'amount', 'cost', 'promotion', 'discount', 'surcharge', 'photo', 'active', 'commerceId'],
    });

    if (addi.length > 0) {
      res.status(201).json(addi);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

additional.get('/all_active/:commerceId', async (req, res) => {
  try {
    const { commerceId } = req.params;
    if (!commerceId && !Number.isInteger(parseInt(commerceId, 10))) {
      res.status(422).send('ID was not provided');
    }
    const addi = await Additional.findAll({
      where: {
        commerceId: parseInt(commerceId, 10),
        active: true,
      },
      attributes: ['id', 'name', 'amount', 'cost', 'promotion', 'discount', 'surcharge', 'photo', 'active', 'commerceId'],
    });

    if (addi.length > 0) {
      res.status(201).json(addi);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

additional.get('/detail/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id && Number.isInteger(parseInt(id, 10))) {
      const addi = await Additional.findAll({
        where: { id: parseInt(id, 10) },
        attributes: ['id', 'name', 'amount', 'cost', 'promotion', 'discount', 'surcharge', 'photo', 'active', 'commerceId'],
      });
      if (addi.length > 0) {
        res.status(201).json(addi);
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

additional.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name, amount, cost, promotion, discount, photo, surcharge,
    } = req.body;
    const additionalFinded = await Additional.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (additionalFinded) {
      await additionalFinded.update({
        name,
        amount,
        cost,
        promotion,
        discount,
        surcharge,
        photo,
      });
      res.status(200).send('The data was modified successfully');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

additional.put('/active/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const additionalFinded = await Additional.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (additionalFinded) {
      await additionalFinded.update({
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

additional.put('/inactive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const additionalFinded = await Additional.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (additionalFinded) {
      await additionalFinded.update({
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

additional.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = additional;
