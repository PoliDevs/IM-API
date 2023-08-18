const supplyType = require('express').Router();
const express = require('express');
const cors = require('cors');
const { SuppliesType, UnitType } = require('../../db');

supplyType.use(express.json());
supplyType.use(cors());
supplyType.use(
  express.urlencoded({
    extended: true,
  }),
);

supplyType.post('/type', async (req, res) => {
  try {
    const { type, detail, unit } = req.body;
    // eslint-disable-next-line no-unused-vars
    const [supplyTypeCreated, created] = await SuppliesType.findOrCreate({
      where: {
        type: type.toLowerCase(),
      },
      defaults: {
        type: type.toLowerCase(),
        detail,
        unitTypeId: unit
          ? (
            await UnitType.findOne({ where: { unit } })
          )?.id
          : null,
      },
    });
    if (created) {
      res.status(200).send('SuppliesType created');
    } else {
      res.status(422).send('Existing SuppliesType ');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

supplyType.get('/all', async (req, res) => {
  try {
    const supy = await SuppliesType.findAll({
      attributes: ['id', 'type', 'detail', 'active'],
      include: [
        {
          model: UnitType,
          attributes: ['id', 'unit', 'detail', 'active'],
        },
      ],
    });

    if (supy.length > 0) {
      res.status(201).json(supy);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.send(error);
  }
});

supplyType.get('/all_active', async (req, res) => {
  try {
    const supy = await SuppliesType.findAll({
      where: { active: true },
      attributes: ['id', 'type', 'detail', 'active'],
      include: [
        {
          model: UnitType,
          attributes: ['id', 'unit', 'detail', 'active'],
        },
      ],
    });

    if (supy.length > 0) {
      res.status(201).json(supy);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.send(error);
  }
});

supplyType.get('/detail/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id && Number.isInteger(parseInt(id, 10))) {
      const supy = await SuppliesType.findAll({
        where: { id: parseInt(id, 10) },
        attributes: ['id', 'type', 'detail', 'active'],
        include: [
          {
            model: UnitType,
            attributes: ['id', 'unit', 'detail', 'active'],
          },
        ],
      });
      if (supy.length > 0) {
        res.status(201).json(supy);
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

supplyType.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { type, detail, unit } = req.body;
    const suplyFinded = await SuppliesType.findOne({
      where: { id },
    });
    if (suplyFinded) {
      await suplyFinded.update({
        type,
        detail,
        unitTypeId: unit
          ? (
            await UnitType.findOne({ where: { unit } })
          )?.id
          : null,
      });
      res.status(200).send('The data was modified successfully');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

supplyType.put('/active/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const suplyFinded = await SuppliesType.findOne({
      where: { id },
    });
    if (suplyFinded) {
      await suplyFinded.update({
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

supplyType.put('/inactive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const suplyFinded = await SuppliesType.findOne({
      where: { id },
    });
    if (suplyFinded) {
      await suplyFinded.update({
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

supplyType.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = supplyType;
