const courierType = require('express').Router();
const express = require('express');
const cors = require('cors');
const { CourierType } = require('../../db');

courierType.use(express.json());
courierType.use(cors());
courierType.use(
  express.urlencoded({
    extended: true,
  }),
);

courierType.post('/courierType', async (req, res) => {
  try {
    const { type, detail, commerceId } = req.body;
    // eslint-disable-next-line no-unused-vars
    const [courierTypeCreated, created] = await CourierType.findOrCreate({
      where: {
        type: type.toLowerCase(),
        commerceId,
      },
      defaults: {
        type: type.toLowerCase(),
        detail,
        commerceId,
      },
    });
    if (created) {
      res.status(200).send('courierType created');
    } else {
      res.status(422).send('Existing courierType ');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

courierType.get('/all/:commerceId', async (req, res) => {
  try {
    const { commerceId } = req.params;
    if (!commerceId && !Number.isInteger(parseInt(commerceId, 10))) {
      res.status(422).send('ID was not provided');
    }
    const busi = await CourierType.findAll({
      where: {
        commerceId: parseInt(commerceId, 10),
      },
      attributes: ['id', 'type', 'detail', 'active', 'commerceId'],
    });

    if (busi.length > 0) {
      res.status(201).json(busi);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

courierType.get('/all_active/:commerceId', async (req, res) => {
  try {
    const { commerceId } = req.params;
    if (!commerceId && !Number.isInteger(parseInt(commerceId, 10))) {
      res.status(422).send('ID was not provided');
    }
    const busi = await CourierType.findAll({
      where: {
        commerceId: parseInt(commerceId, 10),
        active: true,
      },
      attributes: ['id', 'type', 'detail', 'active', 'commerceId'],
    });

    if (busi.length > 0) {
      res.status(201).json(busi);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

courierType.get('/detail/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id && Number.isInteger(parseInt(id, 10))) {
      const busi = await CourierType.findAll({
        where: { id: parseInt(id, 10) },
        attributes: ['id', 'type', 'detail', 'active', 'commerceId'],
      });
      if (busi.length > 0) {
        res.status(201).json(busi);
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

courierType.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { type, detail } = req.body;
    const courierFinded = await CourierType.findOne({
      where: { id: parseInt(id, 10) },
    });
    if (courierFinded) {
      await courierFinded.update({
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

courierType.put('/active/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const courierFinded = await CourierType.findOne({
      where: { id: parseInt(id, 10) },
    });
    if (courierFinded) {
      await courierFinded.update({
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

courierType.put('/inactive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const courierFinded = await CourierType.findOne({
      where: { id: parseInt(id, 10) },
    });
    if (courierFinded) {
      await courierFinded.update({
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

courierType.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = courierType;
