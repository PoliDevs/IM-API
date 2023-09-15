const dishType = require('express').Router();
const express = require('express');
const cors = require('cors');
const { DishType } = require('../../db');

dishType.use(express.json());
dishType.use(cors());
dishType.use(
  express.urlencoded({
    extended: true,
  }),
);

dishType.post('/type', async (req, res) => {
  try {
    const {
      type, detail, photo, commerceId,
    } = req.body;
    // eslint-disable-next-line no-unused-vars
    const [dishTypeCreated, created] = await DishType.findOrCreate({
      where: {
        type: type.toLowerCase(),
        commerceId,
      },
      defaults: {
        type: type.toLowerCase(),
        detail,
        photo,
        commerceId,
      },
    });
    if (created) {
      res.status(200).send('DishType created');
    } else {
      res.status(422).send('Existing DishType ');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

dishType.get('/all/:commerceId', async (req, res) => {
  try {
    const { commerceId } = req.params;
    if (!commerceId && !Number.isInteger(parseInt(commerceId, 10))) {
      res.status(422).send('ID was not provided');
    }
    const disht = await DishType.findAll({
      where: {
        commerceId: parseInt(commerceId, 10),
      },
      attributes: ['id', 'type', 'detail', 'photo', 'active', 'commerceId'],
    });

    if (disht.length > 0) {
      res.status(201).json(disht);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

dishType.get('/all_active/:commerceId', async (req, res) => {
  try {
    const { commerceId } = req.params;
    if (!commerceId && !Number.isInteger(parseInt(commerceId, 10))) {
      res.status(422).send('ID was not provided');
    }
    const disht = await DishType.findAll({
      where: {
        commerceId: parseInt(commerceId, 10),
        active: true,
      },
      attributes: ['id', 'type', 'detail', 'photo', 'active', 'commerceId'],
    });

    if (disht.length > 0) {
      res.status(201).json(disht);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

dishType.get('/detail/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id && Number.isInteger(parseInt(id, 10))) {
      const disht = await DishType.findAll({
        where: { id: parseInt(id, 10) },
        attributes: ['id', 'type', 'detail', 'photo', 'active', 'commerceId'],
      });
      if (disht.length > 0) {
        res.status(201).json(disht);
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

dishType.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { type, detail, photo } = req.body;
    const dishFinded = await DishType.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (dishFinded) {
      await dishFinded.update({
        type,
        detail,
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

dishType.put('/active/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const dishFinded = await DishType.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (dishFinded) {
      await dishFinded.update({
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

dishType.put('/inactive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const dishFinded = await DishType.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (dishFinded) {
      await dishFinded.update({
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

dishType.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = dishType;
