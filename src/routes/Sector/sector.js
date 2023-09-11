const sector = require('express').Router();
const express = require('express');
const cors = require('cors');
const { Sector, Pos } = require('../../db');

sector.use(express.json());
sector.use(cors());
sector.use(
  express.urlencoded({
    extended: true,
  }),
);

sector.post('/sector', async (req, res) => {
  try {
    const {
      name,
      discount,
      surcharge,
      capacity,
      detail,
      qrCode,
    } = req.body;
    // eslint-disable-next-line no-unused-vars
    const [sectorCreated, created] = await Sector.findOrCreate({
      where: {
        name: name.toLowerCase(),
      },
      defaults: {
        name: name.toLowerCase(),
        discount,
        surcharge,
        capacity,
        detail,
        qrCode,
      },
    });
    if (created) {
      res.status(200).send('Sector created');
    } else {
      res.status(422).send('Existing Sector ');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

sector.get('/all', async (req, res) => {
  try {
    const sect = await Sector.findAll({
      attributes: ['id', 'name', 'discount', 'surcharge', 'capacity', 'qrCode', 'detail', 'active'],
    });

    if (sect.length > 0) {
      res.status(201).json(sect);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

sector.get('/sectorPos', async (req, res) => {
  try {
    const sect = await Pos.findAll({
      attributes: ['id', 'qrCode', 'discount', 'surcharge', 'capacity', 'detail', 'sectorId'],
      include: [
        {
          model: Sector,
          attributes: ['id', 'name', 'discount', 'surcharge', 'capacity', 'detail', 'qrCode'],
        },
      ],
    });

    if (sect.length > 0) {
      res.status(201).json(sect);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

sector.get('/all_active', async (req, res) => {
  try {
    const sect = await Sector.findAll({
      where: { active: true },
      attributes: ['id', 'name', 'discount', 'surcharge', 'capacity', 'qrCode', 'detail', 'active'],
    });

    if (sect.length > 0) {
      res.status(201).json(sect);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

sector.get('/detail/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id && Number.isInteger(parseInt(id, 10))) {
      const sect = await Sector.findAll({
        where: { id: parseInt(id, 10) },
        attributes: ['id', 'name', 'discount', 'surcharge', 'capacity', 'qrCode', 'detail', 'active'],
      });
      if (sect.length > 0) {
        res.status(201).json(sect);
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

sector.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      discount,
      surcharge,
      capacity,
      detail,
      qrCode,
    } = req.body;
    const bankFinded = await Sector.findOne({
      where: { id },
    });
    if (bankFinded) {
      await bankFinded.update({
        name,
        discount,
        surcharge,
        capacity,
        detail,
        qrCode,
      });
      res.status(200).send('The data was modified successfully');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

sector.put('/active/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const bankFinded = await Sector.findOne({
      where: { id },
    });
    if (bankFinded) {
      await bankFinded.update({
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

sector.put('/inactive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const bankFinded = await Sector.findOne({
      where: { id },
    });
    if (bankFinded) {
      await bankFinded.update({
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

sector.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = sector;