const commerceFacts = require('express').Router();
const express = require('express');
const cors = require('cors');
const { CommerceFact } = require('../../db');

commerceFacts.use(express.json());
commerceFacts.use(cors());
commerceFacts.use(
  express.urlencoded({
    extended: true,
  }),
);

commerceFacts.post('/fact', async (req, res) => {
  try {
    const { type, detail } = req.body;
    // eslint-disable-next-line no-unused-vars
    const [commerceFactCreated, created] = await CommerceFact.findOrCreate({
      where: {
        type: type.toLowerCase(),
      },
      defaults: {
        type: type.toLowerCase(),
        detail,
      },
    });
    if (created) {
      res.status(200).send('commerceFacts created');
    } else {
      res.status(422).send('Existing commerceFact ');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

commerceFacts.get('/all', async (req, res) => {
  try {
    const busi = await CommerceFact.findAll({
      attributes: ['id', 'type', 'detail', 'active'],
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

commerceFacts.get('/all_active', async (req, res) => {
  try {
    const busi = await CommerceFact.findAll({
      where: { active: true },
      attributes: ['id', 'type', 'detail', 'active'],
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

commerceFacts.get('/detail/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id && Number.isInteger(parseInt(id, 10))) {
      const busi = await CommerceFact.findAll({
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
    res.status(500).send(error);
  }
});

commerceFacts.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { type, detail } = req.body;
    const commerceFinded = await CommerceFact.findOne({
      where: { id },
    });
    if (commerceFinded) {
      await commerceFinded.update({
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

commerceFacts.put('/active/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const commerceFinded = await CommerceFact.findOne({
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

commerceFacts.put('/inactive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const commerceFinded = await CommerceFact.findOne({
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

commerceFacts.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = commerceFacts;
