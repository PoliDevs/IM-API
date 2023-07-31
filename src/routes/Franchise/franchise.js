const franchise = require('express').Router();
const express = require('express');
const cors = require('cors');
const { Franchise, FranchiseType, Business } = require('../../db');

franchise.use(express.json());
franchise.use(cors());
franchise.use(
  express.urlencoded({
    extended: true,
  }),
);

franchise.post('/', async (req, res) => {
  try {
    const {
      name, detail, email, franchiseType, business,
    } = req.body;
    // eslint-disable-next-line no-unused-vars
    const [franchiseCreated, created] = await Franchise.findOrCreate({
      where: {
        name: name.toLowerCase(),
      },
      defaults: {
        name: name.toLowerCase(),
        detail,
        email,
        franchiseTypeId: franchiseType
          ? (
            await FranchiseType.findOne({ where: { type: franchiseType } })
          )?.id
          : null,
        businessId: business
          ? (
            await Business.findOne({ where: { name: business } })
          )?.id
          : null,
      },
    });
    if (created) {
      res.status(200).send('Franchise created');
    } else {
      res.status(422).send('Existing Franchise ');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

franchise.get('/all', async (req, res) => {
  try {
    const franchi = await Franchise.findAll({
      attributes: ['id', 'name', 'detail', 'email', 'active'],
      include: [
        {
          model: FranchiseType,
          attributes: ['id', 'type', 'detail', 'active'],
        },
        {
          model: Business,
          attributes: ['id', 'name', 'ssn', 'detail', 'email', 'confirmed', 'active'],
        },
      ],
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

franchise.get('/all_active', async (req, res) => {
  try {
    const franchi = await Franchise.findAll({
      where: { active: true },
      attributes: ['id', 'name', 'detail', 'email', 'active'],
      include: [
        {
          model: FranchiseType,
          attributes: ['id', 'type', 'detail', 'active'],
        },
        {
          model: Business,
          attributes: ['id', 'name', 'ssn', 'detail', 'email', 'confirmed', 'active'],
        },
      ],
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

franchise.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id && Number.isInteger(parseInt(id, 10))) {
      const franchi = await Franchise.findAll({
        where: { id: parseInt(id, 10) },
        attributes: ['id', 'name', 'detail', 'email', 'active'],
        include: [
          {
            model: FranchiseType,
            attributes: ['id', 'type', 'detail', 'active'],
          },
          {
            model: Business,
            attributes: ['id', 'name', 'ssn', 'detail', 'email', 'confirmed', 'active'],
          },
        ],
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

franchise.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name, detail, email, franchiseType, business,
    } = req.body;
    const franchiseFinded = await Franchise.findOne({
      where: { id },
    });
    if (franchiseFinded) {
      await franchiseFinded.update({
        name,
        detail,
        email,
        franchiseTypeId: franchiseType
          ? (
            await FranchiseType.findOne({ where: { type: franchiseType } })
          )?.id
          : null,
        businessId: business
          ? (
            await Business.findOne({ where: { name: business } })
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

franchise.put('/active/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const franchiseFinded = await Franchise.findOne({
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

franchise.put('/inactive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const franchiseFinded = await Franchise.findOne({
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

module.exports = franchise;
