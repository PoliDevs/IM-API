const pointOfSale = require('express').Router();
const express = require('express');
const cors = require('cors');
const {
  Pos, PosType, Commerce, Sector,
} = require('../../db');

pointOfSale.use(express.json());
pointOfSale.use(cors());
pointOfSale.use(
  express.urlencoded({
    extended: true,
  }),
);

pointOfSale.post('/pos', async (req, res) => {
  try {
    const {
      qrCode, posTypeId, discount, surcharge, capacity, detail, sectorId,
    } = req.body;
    // eslint-disable-next-line no-unused-vars
    const [posCreated, created] = await Pos.findOrCreate({
      where: {
        qrCode: qrCode.toLowerCase(),
        sectorId,
      },
      defaults: {
        qrCode: qrCode.toLowerCase(),
        posTypeId,
        discount,
        surcharge,
        capacity,
        detail,
        sectorId,
      },
    });
    if (created) {
      res.status(200).send('Pos created');
    } else {
      res.status(422).send('Existing Pos ');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

pointOfSale.get('/all/:commerceId', async (req, res) => {
  try {
    const { commerceId } = req.params;
    if (!commerceId && !Number.isInteger(parseInt(commerceId, 10))) {
      res.status(422).send('ID was not provided');
    }
    const point = await Commerce.findAll({
      where: {
        id: parseInt(commerceId, 10),
      },
      attributes: ['id', 'active'],
      include: [
        {
          model: Sector,
          attributes: ['id', 'name', 'active'],
          include: [
            {
              model: Pos,
              attributes: ['id', 'name', 'qrCode', 'posTypeId', 'discount', 'surcharge', 'capacity', 'detail', 'active'],
              include: [
                {
                  model: PosType,
                  attributes: ['id', 'type', 'detail', 'active'],
                },
              ],
            },
          ],
        },
      ],
    });

    if (point.length > 0) {
      res.status(201).json(point);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

pointOfSale.get('/all_active/:commerceId', async (req, res) => {
  try {
    const { commerceId } = req.params;
    if (!commerceId && !Number.isInteger(parseInt(commerceId, 10))) {
      res.status(422).send('ID was not provided');
    }
    const point = await Commerce.findAll({
      where: {
        id: parseInt(commerceId, 10),
      },
      attributes: ['id', 'active'],
      include: [
        {
          model: Sector,
          attributes: ['id', 'name', 'active'],
          include: [
            {
              model: Pos,
              where: {
                active: true,
              },
              attributes: ['id', 'name', 'qrCode', 'posTypeId', 'discount', 'surcharge', 'capacity', 'detail', 'active'],
              include: [
                {
                  model: PosType,
                  attributes: ['id', 'type', 'detail', 'active'],
                },
              ],
            },
          ],
        },
      ],
    });

    if (point.length > 0) {
      res.status(201).json(point);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

pointOfSale.get('/all_inactive/:commerceId', async (req, res) => {
  try {
    const { commerceId } = req.params;
    if (!commerceId && !Number.isInteger(parseInt(commerceId, 10))) {
      res.status(422).send('ID was not provided');
    }
    const point = await Pos.findAll({
      where: {
        id: parseInt(commerceId, 10),
      },
      attributes: ['id', 'active'],
      include: [
        {
          model: Sector,
          attributes: ['id', 'name', 'active'],
          include: [
            {
              model: Pos,
              where: {
                active: false,
              },
              attributes: ['id', 'name', 'qrCode', 'posTypeId', 'discount', 'surcharge', 'capacity', 'detail', 'active'],
              include: [
                {
                  model: PosType,
                  attributes: ['id', 'type', 'detail', 'active'],
                },
              ],
            },
          ],
        },
      ],
    });

    if (point.length > 0) {
      res.status(201).json(point);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

pointOfSale.get('/detail/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id && Number.isInteger(parseInt(id, 10))) {
      const point = await Pos.findAll({
        where: { id: parseInt(id, 10) },
        attributes: ['id', 'name', 'qrCode', 'posTypeId', 'discount', 'surcharge', 'capacity', 'detail', 'active'],
      });
      if (point.length > 0) {
        res.status(201).json(point);
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

pointOfSale.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      qrCode, posTypeId, discount, surcharge, capacity, detail, sectorId,
    } = req.body;
    const posFinded = await Pos.findOne({
      where: { id },
    });
    if (posFinded) {
      await posFinded.update({
        qrCode: qrCode.toLowerCase(),
        posTypeId,
        discount,
        surcharge,
        capacity,
        detail,
        sectorId,
      });
      res.status(200).send('The data was modified successfully');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

pointOfSale.put('/active/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const posFinded = await Pos.findOne({
      id: parseInt(id, 10),
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

pointOfSale.put('/inactive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const posFinded = await Pos.findOne({
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

pointOfSale.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = pointOfSale;
