const pointOfSale = require('express').Router();
const express = require('express');
const cors = require('cors');
const { Pos, PosType, Commerce } = require('../../db');

pointOfSale.use(express.json());
pointOfSale.use(cors());
pointOfSale.use(
  express.urlencoded({
    extended: true,
  }),
);

pointOfSale.post('/pos', async (req, res) => {
  try {
    const { qrCode, posType, commerce } = req.body;
    // eslint-disable-next-line no-unused-vars
    const [posCreated, created] = await Pos.findOrCreate({
      where: {
        qrCode: qrCode.toLowerCase(),
      },
      defaults: {
        qrCode: qrCode.toLowerCase(),
        posTypeId: posType
          ? (
            await PosType.findOne({ where: { type: posType } })
          )?.id
          : null,
        commerceId: commerce
          ? (
            await Commerce.findOne({ where: { name: commerce } })
          )?.id
          : null,
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

pointOfSale.get('/all', async (req, res) => {
  try {
    const point = await Pos.findAll({
      attributes: ['id', 'qrCode', 'active'],
      include: [
        {
          model: PosType,
          attributes: ['id', 'type', 'detail', 'active'],
        },
        {
          model: Commerce,
          attributes: ['id', 'name', 'neighborhood', 'address', 'active'],
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

pointOfSale.get('/all_active', async (req, res) => {
  try {
    const point = await Pos.findAll({
      where: { active: true },
      attributes: ['id', 'qrCode', 'active'],
      include: [
        {
          model: PosType,
          attributes: ['id', 'type', 'detail', 'active'],
        },
        {
          model: Commerce,
          attributes: ['id', 'name', 'neighborhood', 'address', 'active'],
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

pointOfSale.get('/all_inactive', async (req, res) => {
  try {
    const point = await Pos.findAll({
      where: { active: false },
      attributes: ['id', 'qrCode', 'active'],
      include: [
        {
          model: PosType,
          attributes: ['id', 'type', 'detail', 'active'],
        },
        {
          model: Commerce,
          attributes: ['id', 'name', 'neighborhood', 'address', 'active'],
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
        attributes: ['id', 'qrCode', 'active'],
        include: [
          {
            model: PosType,
            attributes: ['id', 'type', 'detail', 'active'],
          },
          {
            model: Commerce,
            attributes: ['id', 'name', 'neighborhood', 'address', 'active'],
          },
        ],
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

pointOfSale.get('/posCommerce/:commerceId', async (req, res) => {
  try {
    const { commerceId } = req.params;
    if (commerceId && Number.isInteger(parseInt(commerceId, 10))) {
      const point = await Commerce.findAll({
        where: { id: parseInt(commerceId, 10) },
        attributes: ['id', 'name', 'neighborhood', 'address', 'active'],
        include: [
          {
            model: Pos,
            attributes: ['id', 'qrCode', 'active'],
            include: [
              {
                model: PosType,
                attributes: ['id', 'type', 'detail', 'active'],
              },
            ],
          },
        ],
      });
      res.status(201).json(point);
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
    const { qrCode, posType, commerce } = req.body;
    const posFinded = await Pos.findOne({
      where: { id },
    });
    if (posFinded) {
      await posFinded.update({
        qrCode,
        posTypeId: posType
          ? (
            await PosType.findOne({ where: { type: posType } })
          )?.id
          : null,
        commerceId: commerce
          ? (
            await Commerce.findOne({ where: { name: commerce } })
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

pointOfSale.put('/active/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const posFinded = await Pos.findOne({
      where: { id },
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
      where: { id },
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
