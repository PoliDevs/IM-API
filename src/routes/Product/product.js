const product = require('express').Router();
const express = require('express');
const cors = require('cors');
const {
  Product,
  ProductType,
  UnitType,
  Supplier,
} = require('../../db');

product.use(express.json());
product.use(cors());
product.use(
  express.urlencoded({
    extended: true,
  }),
);

product.post('/product', async (req, res) => {
  try {
    const {
      name,
      photo,
      stock,
      pointOrder,
      cost,
      allergenType,
      careful,
      unitTypeId,
      productTypeId,
      supplierId,
      commerceId,
    } = req.body;
    // eslint-disable-next-line no-unused-vars
    const [productCreated, created] = await Product.findOrCreate({
      where: {
        name: name.toLowerCase(),
        commerceId,
      },
      defaults: {
        name: name.toLowerCase(),
        photo,
        stock,
        pointOrder,
        cost,
        allergenType,
        careful,
        productTypeId,
        supplierId,
        unitTypeId,
        commerceId,
      },
    });
    if (created) {
      res.status(200).send('Product created');
    } else {
      res.status(422).send('Existing Product ');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

product.get('/all/:commerceId', async (req, res) => {
  try {
    const { commerceId } = req.params;
    if (!commerceId && !Number.isInteger(parseInt(commerceId, 10))) {
      res.status(422).send('ID was not provided');
    }
    const prod = await Product.findAll({
      where: {
        commerceId: parseInt(commerceId, 10),
      },
      attributes: ['id', 'name', 'photo', 'stock', 'pointOrder', 'cost', 'allergenType', 'careful', 'active', 'commerceId'],
      include: [
        {
          model: ProductType,
          attributes: ['id', 'type', 'detail', 'active'],
        },
        {
          model: Supplier,
          attributes: ['id', 'item', 'name', 'ssn', 'mail', 'phone', 'contact', 'active'],
        },
        {
          model: UnitType,
          attributes: ['id', 'unit', 'detail', 'active'],
        },
      ],
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

product.get('/all_active/:commerceId', async (req, res) => {
  try {
    const { commerceId } = req.params;
    if (!commerceId && !Number.isInteger(parseInt(commerceId, 10))) {
      res.status(422).send('ID was not provided');
    }
    const prod = await Product.findAll({
      where: {
        commerceId: parseInt(commerceId, 10),
        active: true,
      },
      attributes: ['id', 'name', 'photo', 'stock', 'pointOrder', 'cost', 'allergenType', 'careful', 'active', 'commerceId'],
      include: [
        {
          model: ProductType,
          attributes: ['id', 'type', 'detail', 'active'],
        },
        {
          model: Supplier,
          attributes: ['id', 'item', 'name', 'ssn', 'mail', 'phone', 'contact', 'active'],
        },
        {
          model: UnitType,
          attributes: ['id', 'unit', 'detail', 'active'],
        },
      ],
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

product.get('/detail/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id && Number.isInteger(parseInt(id, 10))) {
      const prod = await Product.findAll({
        where: { id: parseInt(id, 10) },
        attributes: ['id', 'name', 'photo', 'stock', 'pointOrder', 'cost', 'allergenType', 'careful', 'active', 'commerceId'],
        include: [
          {
            model: ProductType,
            attributes: ['id', 'type', 'detail', 'active'],
          },
          {
            model: Supplier,
            attributes: ['id', 'item', 'name', 'ssn', 'mail', 'phone', 'contact', 'active'],
          },
          {
            model: UnitType,
            attributes: ['id', 'unit', 'detail', 'active'],
          },
        ],
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

product.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      photo,
      stock,
      pointOrder,
      cost,
      allergenType,
      careful,
      unitTypeId,
      productTypeId,
      supplierId,
    } = req.body;
    const productFinded = await Product.findOne({
      where: { id: parseInt(id, 10) },
    });
    if (productFinded) {
      await productFinded.update({
        name: name.toLowerCase(),
        photo,
        stock,
        pointOrder,
        cost,
        allergenType,
        careful,
        productTypeId,
        supplierId,
        unitTypeId,
      });
      res.status(200).send('The data was modified successfully');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

product.put('/active/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const productFinded = await Product.findOne({
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

product.put('/inactive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const productFinded = await Product.findOne({
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

product.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = product;
