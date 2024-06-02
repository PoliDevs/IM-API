const uniType = require('express').Router();
const express = require('express');
const cors = require('cors');
const { UnitType } = require('../../db');

uniType.use(express.json());
uniType.use(cors());
uniType.use(
  express.urlencoded({
    extended: true,
  }),
);

uniType.post('/unit', async (req, res) => {
  try {
    const { unit, detail, commerceId } = req.body;
    // eslint-disable-next-line no-unused-vars
    const [unitTypeCreated, created] = await UnitType.findOrCreate({
      where: {
        unit: unit.toLowerCase(),
        commerceId,
      },
      defaults: {
        unit: unit.toLowerCase(),
        detail,
        commerceId,
      },
    });
    if (created) {
      res.status(200).send('UnitType created');
    } else {
      res.status(422).send('Existing UnitType ');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

uniType.get('/all/:commerceId', async (req, res) => {
  try {
    const { commerceId } = req.params;
    if (!commerceId && !Number.isInteger(parseInt(commerceId, 10))) {
      res.status(422).send('ID was not provided');
    }
    const uni = await UnitType.findAll({
      where: {
        commerceId: parseInt(commerceId, 10),
      },
      attributes: ['id', 'unit', 'detail', 'active', 'commerceId'],
    });

    if (uni.length > 0) {
      res.status(201).json(uni);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

uniType.get('/all_active/:commerceId', async (req, res) => {
  try {
    const { commerceId } = req.params;
    if (!commerceId && !Number.isInteger(parseInt(commerceId, 10))) {
      res.status(422).send('ID was not provided');
    }
    const uni = await UnitType.findAll({
      where: {
        commerceId: parseInt(commerceId, 10),
        active: true,
      },
      attributes: ['id', 'unit', 'detail', 'active', 'commerceId'],
    });

    if (uni.length > 0) {
      res.status(201).json(uni);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

uniType.get('/detail/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id && Number.isInteger(parseInt(id, 10))) {
      const uni = await UnitType.findAll({
        where: { id: parseInt(id, 10) },
        attributes: ['id', 'unit', 'detail', 'active', 'commerceId'],
      });
      if (uni.length > 0) {
        res.status(201).json(uni);
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

uniType.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { unit, detail } = req.body;
    const unitFinded = await UnitType.findOne({
      where: { id: parseInt(id, 10) },
    });
    if (unitFinded) {
      await unitFinded.update({
        unit,
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

uniType.put('/active/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const unitFinded = await UnitType.findOne({
      where: { id: parseInt(id, 10) },
    });
    if (unitFinded) {
      await unitFinded.update({
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

uniType.put('/inactive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const unitFinded = await UnitType.findOne({
      where: { id: parseInt(id, 10) },
    });
    if (unitFinded) {
      await unitFinded.update({
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

uniType.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = uniType;
