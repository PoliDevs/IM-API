const posType = require('express').Router();
const express = require('express');
const cors = require('cors');
const { PosType } = require('../../db');

posType.use(express.json());
posType.use(cors());
posType.use(
  express.urlencoded({
    extended: true,
  }),
);

posType.post('/type', async (req, res) => {
  try {
    const { type, detail, commerceId } = req.body;
    // eslint-disable-next-line no-unused-vars
    const [posTypeCreated, created] = await PosType.findOrCreate({
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
      res.status(200).send('PosType created');
    } else {
      res.status(422).send('Existing PosType ');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

posType.get('/all/:commerceId', async (req, res) => {
  try {
    const { commerceId } = req.params;
    if (!commerceId && !Number.isInteger(parseInt(commerceId, 10))) {
      res.status(422).send('ID was not provided');
    }
    const poss = await PosType.findAll({
      where: {
        commerceId: parseInt(commerceId, 10),
      },
      attributes: ['id', 'type', 'detail', 'active', 'commerceId'],
    });

    if (poss.length > 0) {
      res.status(201).json(poss);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

posType.get('/all_active/:commerceId', async (req, res) => {
  try {
    const { commerceId } = req.params;
    if (!commerceId && !Number.isInteger(parseInt(commerceId, 10))) {
      res.status(422).send('ID was not provided');
    }
    const poss = await PosType.findAll({
      where: {
        commerceId: parseInt(commerceId, 10),
        active: true,
      },
      attributes: ['id', 'type', 'detail', 'active', 'commerceId'],
    });

    if (poss.length > 0) {
      res.status(201).json(poss);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

posType.get('/detail/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id && Number.isInteger(parseInt(id, 10))) {
      const poss = await PosType.findAll({
        where: { id: parseInt(id, 10) },
        attributes: ['id', 'type', 'detail', 'active', 'commerceId'],
      });
      if (poss.length > 0) {
        res.status(201).json(poss);
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

posType.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { type, detail, commerceId } = req.body;
    const posFinded = await PosType.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (posFinded) {
      await posFinded.update({
        type,
        detail,
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

posType.put('/active/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const posFinded = await PosType.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (posFinded) {
      await posFinded.update({
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

posType.put('/inactive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const posFinded = await PosType.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (posFinded) {
      await posFinded.update({
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

posType.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = posType;
