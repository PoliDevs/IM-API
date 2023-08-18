const businessType = require('express').Router();
const express = require('express');
const cors = require('cors');
const { BusinessType } = require('../../db');

businessType.use(express.json());
businessType.use(cors());
businessType.use(
  express.urlencoded({
    extended: true,
  }),
);

businessType.post('/businessType', async (req, res) => {
  try {
    const { type, detail } = req.body;
    // eslint-disable-next-line no-unused-vars
    const [businessTypeCreated, created] = await BusinessType.findOrCreate({
      where: {
        type: type.toLowerCase(),
      },
      defaults: {
        type: type.toLowerCase(),
        detail,
      },
    });
    if (created) {
      res.status(200).send('BusinessType created');
    } else {
      res.status(422).send('Existing BusinessType ');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

businessType.get('/all', async (req, res) => {
  try {
    const busi = await BusinessType.findAll({
      attributes: ['id', 'type', 'detail', 'active'],
    });

    if (busi.length > 0) {
      res.status(201).json(busi);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.send(error);
  }
});

businessType.get('/all_active', async (req, res) => {
  try {
    const busi = await BusinessType.findAll({
      where: { active: true },
      attributes: ['id', 'type', 'detail', 'active'],
    });

    if (busi.length > 0) {
      res.status(201).json(busi);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.send(error);
  }
});

businessType.get('/detail/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id && Number.isInteger(parseInt(id, 10))) {
      const busi = await BusinessType.findAll({
        where: { id: parseInt(id, 10) },
        attributes: ['id', 'type', 'detail', 'active'],
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
    res.send(error);
  }
});

businessType.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { type, detail } = req.body;
    const businessFinded = await BusinessType.findOne({
      where: { id },
    });
    if (businessFinded) {
      await businessFinded.update({
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

businessType.put('/active/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const businessFinded = await BusinessType.findOne({
      where: { id },
    });
    if (businessFinded) {
      await businessFinded.update({
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

businessType.put('/inactive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const businessFinded = await BusinessType.findOne({
      where: { id },
    });
    if (businessFinded) {
      await businessFinded.update({
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

businessType.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = businessType;
