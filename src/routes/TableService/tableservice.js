const tableservice = require('express').Router();
const express = require('express');
const cors = require('cors');
const { TableService } = require('../../db');

tableservice.use(express.json());
tableservice.use(cors());
tableservice.use(
  express.urlencoded({
    extended: true,
  }),
);

tableservice.post('/service', async (req, res) => {
  try {
    const {
      type, detail, cost, promotion, discount, surcharge, validity, commerceId,
    } = req.body;
    // eslint-disable-next-line no-unused-vars
    const [tableServiceCreated, created] = await TableService.findOrCreate({
      where: {
        type: type.toLowerCase(),
        commerceId,
      },
      defaults: {
        type: type.toLowerCase(),
        detail,
        cost,
        promotion,
        discount,
        surcharge,
        validity,
        commerceId,
      },
    });
    if (created) {
      res.status(200).send('TableService created');
    } else {
      res.status(422).send('Existing TableService ');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

tableservice.get('/all/:commerceId', async (req, res) => {
  try {
    const { commerceId } = req.params;
    if (!commerceId && !Number.isInteger(parseInt(commerceId, 10))) {
      res.status(422).send('ID was not provided');
    }
    const service = await TableService.findAll({
      where: {
        commerceId: parseInt(commerceId, 10),
      },
      attributes: ['id', 'type', 'detail', 'cost', 'promotion', 'discount', 'surcharge', 'validity', 'active', 'commerceId'],
    });

    if (service.length > 0) {
      res.status(201).json(service);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

tableservice.get('/all_active/:commerceId', async (req, res) => {
  try {
    const { commerceId } = req.params;
    if (!commerceId && !Number.isInteger(parseInt(commerceId, 10))) {
      res.status(422).send('ID was not provided');
    }
    const service = await TableService.findAll({
      where: {
        commerceId: parseInt(commerceId, 10),
        active: true,
      },
      attributes: ['id', 'type', 'detail', 'cost', 'promotion', 'discount', 'surcharge', 'validity', 'active', 'commerceId'],
    });

    if (service.length > 0) {
      res.status(201).json(service);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

tableservice.get('/detail/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id && Number.isInteger(parseInt(id, 10))) {
      const service = await TableService.findAll({
        where: { id: parseInt(id, 10) },
        attributes: ['id', 'type', 'detail', 'cost', 'promotion', 'discount', 'surcharge', 'validity', 'active', 'commerceId'],
      });
      if (service.length > 0) {
        res.status(201).json(service);
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

tableservice.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      type, detail, cost, promotion, discount, surcharge, validity, commerceId,
    } = req.body;
    const serviceFinded = await TableService.findOne({
      where: { id },
    });
    if (serviceFinded) {
      await serviceFinded.update({
        type,
        detail,
        cost,
        promotion,
        discount,
        surcharge,
        validity,
        commerceId,
      });
      res.status(200).send('The data was modified successfully');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

tableservice.put('/active/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const serviceFinded = await TableService.findOne({
      id: parseInt(id, 10),
    });
    if (serviceFinded) {
      await serviceFinded.update({
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

tableservice.put('/inactive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const serviceFinded = await TableService.findOne({
      id: parseInt(id, 10),
    });
    if (serviceFinded) {
      await serviceFinded.update({
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

tableservice.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = tableservice;
