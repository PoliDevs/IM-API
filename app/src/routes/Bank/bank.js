const bank = require('express').Router();
const express = require('express');
const cors = require('cors');
const { Bank } = require('../../db');

bank.use(express.json());
bank.use(cors());
bank.use(
  express.urlencoded({
    extended: true,
  }),
);

bank.post('/bank', async (req, res) => {
  try {
    const {
      account, number, detail, commerceId,
    } = req.body;
    // eslint-disable-next-line no-unused-vars
    const [bankCreated, created] = await Bank.findOrCreate({
      where: {
        account: account.toLowerCase(),
        commerceId,
      },
      defaults: {
        account: account.toLowerCase(),
        number,
        detail,
        commerceId,
      },
    });
    if (created) {
      res.status(200).send('Bank created');
    } else {
      res.status(422).send('Existing Bank ');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

bank.get('/all/:commerceId', async (req, res) => {
  try {
    const { commerceId } = req.params;
    if (!commerceId && !Number.isInteger(parseInt(commerceId, 10))) {
      res.status(422).send('ID was not provided');
    }
    const banki = await Bank.findAll({
      where: {
        commerceId: parseInt(commerceId, 10),
      },
      attributes: ['id', 'account', 'number', 'detail', 'commerceId', 'active'],
    });

    if (banki.length > 0) {
      res.status(201).json(banki);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

bank.get('/all_active/:commerceId', async (req, res) => {
  try {
    const { commerceId } = req.params;
    if (!commerceId && !Number.isInteger(parseInt(commerceId, 10))) {
      res.status(422).send('ID was not provided');
    }
    const banki = await Bank.findAll({
      where: {
        commerceId: parseInt(commerceId, 10),
        active: true,
      },
      attributes: ['id', 'account', 'number', 'detail', 'commerceId', 'active'],
    });

    if (banki.length > 0) {
      res.status(201).json(banki);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

bank.get('/detail/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id && Number.isInteger(parseInt(id, 10))) {
      const banki = await Bank.findAll({
        where: {
          id: parseInt(id, 10),
        },
        attributes: ['id', 'account', 'number', 'detail', 'commerceId', 'active'],
      });
      if (banki.length > 0) {
        res.status(201).json(banki);
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

bank.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      account, number, detail, commerceId,
    } = req.body;
    const bankFinded = await Bank.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (bankFinded) {
      await bankFinded.update({
        account,
        number,
        detail,
        commerceId,
      });
      res.status(200).send('The data was modified successfully');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

bank.put('/active/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const bankFinded = await Bank.findOne({
      where: {
        id: parseInt(id, 10),
      },
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

bank.put('/inactive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const bankFinded = await Bank.findOne({
      where: {
        id: parseInt(id, 10),
      },
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

bank.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = bank;
