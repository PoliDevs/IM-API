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
      name, amount, cost, promotion, discount, photo,
    } = req.body;
    // eslint-disable-next-line no-unused-vars
    const [additionalCreated, created] = await Additional.findOrCreate({
      where: {
        name: name.toLowerCase(),
      },
      defaults: {
        name: name.toLowerCase(),
        amount,
        cost,
        promotion,
        discount,
        photo,
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

additional.get('/all', async (req, res) => {
  try {
    const addi = await Additional.findAll({
      attributes: ['id', 'name', 'amount', 'cost', 'promotion', 'discount', 'photo', 'active'],
    });

    if (addi.length > 0) {
      res.status(201).json(addi);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.send(error);
  }
});

additional.get('/all_active', async (req, res) => {
  try {
    const addi = await Additional.findAll({
      where: { active: true },
      attributes: ['id', 'name', 'amount', 'cost', 'promotion', 'discount', 'photo', 'active'],
    });

    if (addi.length > 0) {
      res.status(201).json(addi);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.send(error);
  }
});

additional.get('/detail/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id && Number.isInteger(parseInt(id, 10))) {
      const addi = await Additional.findAll({
        where: { id: parseInt(id, 10) },
        attributes: ['id', 'name', 'amount', 'cost', 'promotion', 'discount', 'photo', 'active'],
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
    res.send(error);
  }
});

additional.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name, amount, cost, promotion, discount, photo,
    } = req.body;
    const additionalFinded = await Additional.findOne({
      where: { id },
    });
    if (additionalFinded) {
      await additionalFinded.update({
        name,
        amount,
        cost,
        promotion,
        discount,
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
      where: { id },
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
      where: { id },
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
