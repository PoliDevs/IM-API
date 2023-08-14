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

uniType.post('/', async (req, res) => {
  try {
    const { unit, detail } = req.body;
    // eslint-disable-next-line no-unused-vars
    const [unitTypeCreated, created] = await UnitType.findOrCreate({
      where: {
        unit: unit.toLowerCase(),
      },
      defaults: {
        unit: unit.toLowerCase(),
        detail,
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

uniType.get('/all', async (req, res) => {
  try {
    const uni = await UnitType.findAll({
      attributes: ['id', 'unit', 'detail', 'active'],
    });

    if (uni.length > 0) {
      res.status(201).json(uni);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.send(error);
  }
});

uniType.get('/all_active', async (req, res) => {
  try {
    const uni = await UnitType.findAll({
      where: { active: true },
      attributes: ['id', 'unit', 'detail', 'active'],
    });

    if (uni.length > 0) {
      res.status(201).json(uni);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.send(error);
  }
});

uniType.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id && Number.isInteger(parseInt(id, 10))) {
      const uni = await UnitType.findAll({
        where: { id: parseInt(id, 10) },
        attributes: ['id', 'unit', 'detail', 'active'],
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
    res.send(error);
  }
});

uniType.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { unit, detail } = req.body;
    const unitFinded = await UnitType.findOne({
      where: { id },
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
      where: { id },
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
      where: { id },
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

module.exports = uniType;
