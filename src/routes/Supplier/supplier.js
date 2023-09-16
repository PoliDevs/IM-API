const supplier = require('express').Router();
const express = require('express');
const cors = require('cors');
const { Supplier } = require('../../db');

supplier.use(express.json());
supplier.use(cors());
supplier.use(
  express.urlencoded({
    extended: true,
  }),
);

supplier.post('/supplier', async (req, res) => {
  try {
    const {
      item,
      name,
      ssn,
      mail,
      phone,
      contact,
      commerceId,
    } = req.body;
    // eslint-disable-next-line no-unused-vars
    const [supplierCreated, created] = await Supplier.findOrCreate({
      where: {
        name: name.toLowerCase(),
        commerceId,
      },
      defaults: {
        name: name.toLowerCase(),
        item,
        ssn,
        mail,
        phone,
        contact,
      },
    });
    if (created) {
      res.status(200).send('Supplier created');
    } else {
      res.status(422).send('Existing Supplier ');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

supplier.get('/all/:commerceId', async (req, res) => {
  try {
    const { commerceId } = req.params;
    if (!commerceId && !Number.isInteger(parseInt(commerceId, 10))) {
      res.status(422).send('ID was not provided');
    }
    const supp = await Supplier.findAll({
      where: {
        commerceId: parseInt(commerceId, 10),
      },
      attributes: ['id', 'item', 'name', 'ssn', 'mail', 'phone', 'contact', 'start', 'active', 'commerceId'],
    });

    if (supp.length > 0) {
      res.status(201).json(supp);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

supplier.get('/all_active/:commerceId', async (req, res) => {
  try {
    const { commerceId } = req.params;
    if (!commerceId && !Number.isInteger(parseInt(commerceId, 10))) {
      res.status(422).send('ID was not provided');
    }
    const supp = await Supplier.findAll({
      where: {
        commerceId: parseInt(commerceId, 10),
        active: true,
      },
      attributes: ['id', 'item', 'name', 'ssn', 'mail', 'phone', 'contact', 'active', 'start', 'commerceId'],
    });

    if (supp.length > 0) {
      res.status(201).json(supp);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

supplier.get('/detail/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id && Number.isInteger(parseInt(id, 10))) {
      const supp = await Supplier.findAll({
        where: { id: parseInt(id, 10) },
        attributes: ['id', 'item', 'name', 'ssn', 'mail', 'phone', 'contact', 'active', 'start', 'commerceId'],
      });
      if (supp.length > 0) {
        res.status(201).json(supp);
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

supplier.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      item,
      name,
      ssn,
      mail,
      phone,
      contact,
    } = req.body;
    const supplierFinded = await Supplier.findOne({
      where: { id: parseInt(id, 10) },
    });
    if (supplierFinded) {
      await supplierFinded.update({
        item,
        name,
        ssn,
        mail,
        phone,
        contact,
      });
      res.status(200).send('The data was modified successfully');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

supplier.put('/active/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const supplierFinded = await Supplier.findOne({
      where: { id: parseInt(id, 10) },
    });
    if (supplierFinded) {
      await supplierFinded.update({
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

supplier.put('/inactive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const supplierFinded = await Supplier.findOne({
      where: { id: parseInt(id, 10) },
    });
    if (supplierFinded) {
      await supplierFinded.update({
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

supplier.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = supplier;
