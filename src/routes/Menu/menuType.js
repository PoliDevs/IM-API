const menuType = require('express').Router();
const express = require('express');
const cors = require('cors');
const { MenuType } = require('../../db');

menuType.use(express.json());
menuType.use(cors());
menuType.use(
  express.urlencoded({
    extended: true,
  }),
);

menuType.post('/type', async (req, res) => {
  try {
    const { type, detail, commerceId } = req.body;
    // eslint-disable-next-line no-unused-vars
    const [menuTypeCreated, created] = await MenuType.findOrCreate({
      where: {
        type: type.toLowerCase(),
      },
      defaults: {
        type: type.toLowerCase(),
        detail,
        commerceId,
      },
    });
    if (created) {
      res.status(200).send('menuType created');
    } else {
      res.status(422).send('Existing menuType ');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

menuType.get('/all/:commerceId', async (req, res) => {
  try {
    const { commerceId } = req.params;
    if (!commerceId && !Number.isInteger(parseInt(commerceId, 10))) {
      res.status(422).send('ID was not provided');
    }
    const menut = await MenuType.findAll({
      where: {
        commerceId: parseInt(commerceId, 10),
      },
      attributes: ['id', 'type', 'detail', 'commerceId', 'active'],
    });

    if (menut.length > 0) {
      res.status(201).json(menut);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

menuType.get('/all_active/:commerceId', async (req, res) => {
  try {
    const { commerceId } = req.params;
    if (!commerceId && !Number.isInteger(parseInt(commerceId, 10))) {
      res.status(422).send('ID was not provided');
    }
    const menut = await MenuType.findAll({
      where: {
        commerceId: parseInt(commerceId, 10),
        active: true,
      },
      attributes: ['id', 'type', 'detail', 'commerceId', 'active'],
    });

    if (menut.length > 0) {
      res.status(201).json(menut);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

menuType.get('/detail/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id && Number.isInteger(parseInt(id, 10))) {
      const menut = await MenuType.findAll({
        where: { id: parseInt(id, 10) },
        attributes: ['id', 'type', 'detail', 'commerceId', 'active'],
      });
      if (menut.length > 0) {
        res.status(201).json(menut);
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

menuType.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { type, detail, commerceId } = req.body;
    const menuFinded = await MenuType.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (menuFinded) {
      await menuFinded.update({
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

menuType.put('/active/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const menuFinded = await MenuType.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (menuFinded) {
      await menuFinded.update({
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

menuType.put('/inactive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const menuFinded = await MenuType.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (menuFinded) {
      await menuFinded.update({
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

menuType.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = menuType;
