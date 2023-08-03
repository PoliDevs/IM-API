const commerces = require('express').Router();
const express = require('express');
const cors = require('cors');
const { Commerce, CommerceFact } = require('../../db');

commerces.use(express.json());
commerces.use(cors());
commerces.use(
  express.urlencoded({
    extended: true,
  }),
);

commerces.post('/', async (req, res) => {
  try {
    const {
      name, neighborhood, address, workSchedule, email, active, employee, franchise, commerceFact,
    } = req.body;
    // eslint-disable-next-line no-unused-vars
    const [businessCreated, created] = await Commerce.findOrCreate({
      where: {
        name: name.toLowerCase(),
      },
      defaults: {
        name: name.toLowerCase(),
        email,
        commerceFactId: commerceFact
          ? (
            await CommerceFact.findOne({ where: { type: commerceFact } })
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

commerces.get('/all', async (req, res) => {
  try {
    const busi = await Commerce.findAll({
      attributes: ['id', 'name', 'ssn', 'detail', 'email', 'confirmed', 'active'],
      include: [
        {
          model: CommerceFact,
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
    res.send(error);
  }
});

commerces.get('/all_active', async (req, res) => {
  try {
    const busi = await Commerce.findAll({
      where: { active: true },
      attributes: ['id', 'name', 'ssn', 'detail', 'email', 'confirmed', 'active'],
      include: [
        {
          model: CommerceFact,
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
    res.send(error);
  }
});

commerces.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id && Number.isInteger(parseInt(id, 10))) {
      const busi = await Commerce.findAll({
        where: { id: parseInt(id, 10) },
        attributes: ['id', 'name', 'ssn', 'detail', 'email', 'confirmed', 'active'],
        include: [
          {
            model: CommerceFact,
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
    res.send(error);
  }
});

commerces.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name, email, commerceFact,
    } = req.body;
    const businessFinded = await Commerce.findOne({
      where: { id },
    });
    if (businessFinded) {
      await businessFinded.update({
        name,
        email,
        commerceFactId: commerceFact
          ? (
            await CommerceFact.findOne({ where: { type: commerceFact } })
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

commerces.put('/confirmed/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const commerceFinded = await Commerce.findOne({
      where: { id },
    });
    if (commerceFinded) {
      await commerceFinded.update({
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

commerces.put('/unconfirmed/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const commerceFinded = await Commerce.findOne({
      where: { id },
    });
    if (commerceFinded) {
      await commerceFinded.update({
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

commerces.put('/active/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const commerceFinded = await Commerce.findOne({
      where: { id },
    });
    if (commerceFinded) {
      await commerceFinded.update({
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

commerces.put('/inactive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const commerceFinded = await Commerce.findOne({
      where: { id },
    });
    if (commerceFinded) {
      await commerceFinded.update({
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

module.exports = commerces;
