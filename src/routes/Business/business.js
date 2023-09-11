const business = require('express').Router();
const express = require('express');
const cors = require('cors');
const { Business, BusinessType } = require('../../db');

business.use(express.json());
business.use(cors());
business.use(
  express.urlencoded({
    extended: true,
  }),
);

business.post('/business', async (req, res) => {
  try {
    const {
      name, ssn, detail, email, businessType,
    } = req.body;
    // eslint-disable-next-line no-unused-vars
    const [businessCreated, created] = await Business.findOrCreate({
      where: {
        name: name.toLowerCase(),
      },
      defaults: {
        name: name.toLowerCase(),
        ssn,
        detail,
        email,
        businessTypeId: businessType
          ? (
            await BusinessType.findOne({ where: { type: businessType } })
          )?.id
          : null,
      },
    });
    if (created) {
      res.status(200).send('Business created');
    } else {
      res.status(422).send('Existing Business ');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

business.get('/all', async (req, res) => {
  try {
    const busi = await Business.findAll({
      attributes: ['id', 'name', 'ssn', 'detail', 'email', 'confirmed', 'active'],
      include: [
        {
          model: BusinessType,
          attributes: ['id', 'type', 'detail', 'active'],
        },
      ],
    });

    if (busi.length > 0) {
      res.status(201).json(busi);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

business.get('/all_active', async (req, res) => {
  try {
    const busi = await Business.findAll({
      where: { active: true },
      attributes: ['id', 'name', 'ssn', 'detail', 'email', 'confirmed', 'active'],
      include: [
        {
          model: BusinessType,
          attributes: ['id', 'type', 'detail', 'active'],
        },
      ],
    });

    if (busi.length > 0) {
      res.status(201).json(busi);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

business.get('/detail/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id && Number.isInteger(parseInt(id, 10))) {
      const busi = await Business.findAll({
        where: { id: parseInt(id, 10) },
        attributes: ['id', 'name', 'ssn', 'detail', 'email', 'confirmed', 'active'],
        include: [
          {
            model: BusinessType,
            attributes: ['id', 'type', 'detail', 'active'],
          },
        ],
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
    res.status(500).send(error);
  }
});

business.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name, ssn, detail, email, businessType,
    } = req.body;
    const businessFinded = await Business.findOne({
      where: { id },
    });
    if (businessFinded) {
      await businessFinded.update({
        name,
        ssn,
        detail,
        email,
        businessTypeId: businessType
          ? (
            await BusinessType.findOne({ where: { type: businessType } })
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

business.put('/confirmed/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const businessFinded = await Business.findOne({
      where: { id },
    });
    if (businessFinded) {
      await businessFinded.update({
        confirmed: true,
      });
      res.status(200).send('Confirmed');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

business.put('/unconfirmed/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const businessFinded = await Business.findOne({
      where: { id },
    });
    if (businessFinded) {
      await businessFinded.update({
        confirmed: false,
      });
      res.status(200).send('Unconfirmed');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

business.put('/active/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const businessFinded = await Business.findOne({
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

business.put('/inactive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const businessFinded = await Business.findOne({
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

business.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = business;
