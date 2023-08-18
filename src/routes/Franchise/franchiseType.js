const franchiseType = require('express').Router();
const express = require('express');
const cors = require('cors');
const { FranchiseType } = require('../../db');

franchiseType.use(express.json());
franchiseType.use(cors());
franchiseType.use(
  express.urlencoded({
    extended: true,
  }),
);

franchiseType.post('/type', async (req, res) => {
  try {
    const { type, detail } = req.body;
    // eslint-disable-next-line no-unused-vars
    const [franchiseTypeCreated, created] = await FranchiseType.findOrCreate({
      where: {
        type: type.toLowerCase(),
      },
      defaults: {
        type: type.toLowerCase(),
        detail,
      },
    });
    if (created) {
      res.status(200).send('FranchiseType created');
    } else {
      res.status(422).send('Existing FranchiseType ');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

franchiseType.get('/all', async (req, res) => {
  try {
    const franchi = await FranchiseType.findAll({
      attributes: ['id', 'type', 'detail', 'active'],
    });

    if (franchi.length > 0) {
      res.status(201).json(franchi);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.send(error);
  }
});

franchiseType.get('/all_active', async (req, res) => {
  try {
    const franchi = await FranchiseType.findAll({
      where: { active: true },
      attributes: ['id', 'type', 'detail', 'active'],
    });

    if (franchi.length > 0) {
      res.status(201).json(franchi);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.send(error);
  }
});

franchiseType.get('/detail/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id && Number.isInteger(parseInt(id, 10))) {
      const franchi = await FranchiseType.findAll({
        where: { id: parseInt(id, 10) },
        attributes: ['id', 'type', 'detail', 'active'],
      });
      if (franchi.length > 0) {
        res.status(201).json(franchi);
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

franchiseType.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { type, detail } = req.body;
    const franchiseFinded = await FranchiseType.findOne({
      where: { id },
    });
    if (franchiseFinded) {
      await franchiseFinded.update({
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

franchiseType.put('/active/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const franchiseFinded = await FranchiseType.findOne({
      where: { id },
    });
    if (franchiseFinded) {
      await franchiseFinded.update({
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

franchiseType.put('/inactive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const franchiseFinded = await FranchiseType.findOne({
      where: { id },
    });
    if (franchiseFinded) {
      await franchiseFinded.update({
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

franchiseType.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = franchiseType;
