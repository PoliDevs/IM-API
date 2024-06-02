const productType = require('express').Router();
const express = require('express');
const cors = require('cors');
const { ProductType } = require('../../db');

productType.use(express.json());
productType.use(cors());
productType.use(
  express.urlencoded({
    extended: true,
  }),
);

productType.post('/type', async (req, res) => {
  try {
    const { type, detail, commerceId } = req.body;
    // eslint-disable-next-line no-unused-vars
    const [productTypeCreated, created] = await ProductType.findOrCreate({
      where: {
        type: type.toLowerCase(),
        commerceId,
      },
      defaults: {
        type: type.toLowerCase(),
        detail,
        commerceId,
      },
    });
    if (created) {
      res.status(200).send('ProductType created');
    } else {
      res.status(422).send('Existing ProductType ');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

productType.get('/all/:commerceId', async (req, res) => {
  try {
    const { commerceId } = req.params;
    if (!commerceId && !Number.isInteger(parseInt(commerceId, 10))) {
      res.status(422).send('ID was not provided');
    }
    const prod = await ProductType.findAll({
      where: {
        commerceId: parseInt(commerceId, 10),
      },
      attributes: ['id', 'type', 'detail', 'active', 'commerceId'],
    });

    if (prod.length > 0) {
      res.status(201).json(prod);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

productType.get('/all_active/:commerceId', async (req, res) => {
  try {
    const { commerceId } = req.params;
    if (!commerceId && !Number.isInteger(parseInt(commerceId, 10))) {
      res.status(422).send('ID was not provided');
    }
    const prod = await ProductType.findAll({
      where: {
        commerceId: parseInt(commerceId, 10),
        active: true,
      },
      attributes: ['id', 'type', 'detail', 'active', 'commerceId'],
    });

    if (prod.length > 0) {
      res.status(201).json(prod);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

productType.get('/detail/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id && Number.isInteger(parseInt(id, 10))) {
      const prod = await ProductType.findAll({
        where: { id: parseInt(id, 10) },
        attributes: ['id', 'type', 'detail', 'active', 'commerceId'],
      });
      if (prod.length > 0) {
        res.status(201).json(prod);
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

productType.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { type, detail } = req.body;
    const productFinded = await ProductType.findOne({
      where: { id: parseInt(id, 10) },
    });
    if (productFinded) {
      await productFinded.update({
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

productType.put('/active/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const productFinded = await ProductType.findOne({
      where: { id: parseInt(id, 10) },
    });
    if (productFinded) {
      await productFinded.update({
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

productType.put('/inactive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const productFinded = await ProductType.findOne({
      where: { id: parseInt(id, 10) },
    });
    if (productFinded) {
      await productFinded.update({
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

productType.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = productType;
