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
    } = req.body;
    // eslint-disable-next-line no-unused-vars
    const [supplierCreated, created] = await Supplier.findOrCreate({
      where: {
        name: name.toLowerCase(),
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

supplier.get('/all', async (req, res) => {
  try {
    const supp = await Supplier.findAll({
      attributes: ['id', 'item', 'name', 'ssn', 'mail', 'phone', 'contact', 'active'],
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

supplier.get('/all_active', async (req, res) => {
  try {
    const supp = await Supplier.findAll({
      where: { active: true },
      attributes: ['id', 'item', 'name', 'ssn', 'mail', 'phone', 'contact', 'active'],
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
        attributes: ['id', 'item', 'name', 'ssn', 'mail', 'phone', 'contact', 'active'],
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
      where: { id },
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
      where: { id },
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
      where: { id },
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
