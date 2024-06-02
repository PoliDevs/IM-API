const supply = require('express').Router();
const express = require('express');
const cors = require('cors');
const {
  Supply, Supplier, SuppliesType, UnitType,
} = require('../../db');

supply.use(express.json());
supply.use(cors());
supply.use(
  express.urlencoded({
    extended: true,
  }),
);

supply.post('/supply', async (req, res) => {
  try {
    const {
      name,
      cost,
      promotion,
      discount,
      surcharge,
      supplierId,
      suppliesTypeId,
      commerceId,
      amount,
      unitTypeId,
    } = req.body;
    // eslint-disable-next-line no-unused-vars
    const [supplyCreated, created] = await Supply.findOrCreate({
      where: {
        name: name.toLowerCase(),
        commerceId,
        supplierId,
      },
      defaults: {
        name: name.toLowerCase(),
        cost,
        promotion,
        discount,
        supplierId,
        surcharge,
        suppliesTypeId,
        commerceId,
        unitTypeId,
        amount,
      },
    });
    if (created) {
      res.status(200).send('Supply created');
    } else {
      res.status(422).send('Existing Supply ');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

supply.get('/all/:commerceId', async (req, res) => {
  try {
    const { commerceId } = req.params;
    if (!commerceId && !Number.isInteger(parseInt(commerceId, 10))) {
      res.status(422).send('ID was not provided');
    }
    const suppi = await Supply.findAll({
      where: {
        commerceId: parseInt(commerceId, 10),
      },
      attributes: ['id', 'name', 'cost', 'promotion', 'discount', 'surcharge', 'amount', 'active', 'commerceId'],
      include: [
        {
          model: Supplier,
          attributes: ['id', 'item', 'name', 'ssn', 'mail', 'phone', 'contact', 'active'],
        },
        {
          model: SuppliesType,
          attributes: ['id', 'type', 'detail', 'active'],
          include: [
            {
              model: UnitType,
              attributes: ['id', 'unit', 'detail', 'active'],
            },
          ],
        },
      ],
    });

    if (suppi.length > 0) {
      res.status(201).json(suppi);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

supply.get('/all_active/:commerceId', async (req, res) => {
  try {
    const { commerceId } = req.params;
    if (!commerceId && !Number.isInteger(parseInt(commerceId, 10))) {
      res.status(422).send('ID was not provided');
    }
    const suppi = await Supply.findAll({
      where: {
        commerceId: parseInt(commerceId, 10),
        active: true,
      },
      attributes: ['id', 'name', 'cost', 'promotion', 'discount', 'surcharge', 'amount', 'active', 'commerceId'],
      include: [
        {
          model: Supplier,
          attributes: ['id', 'item', 'name', 'ssn', 'mail', 'phone', 'contact', 'active'],
        },
        {
          model: SuppliesType,
          attributes: ['id', 'type', 'detail', 'active'],
        },
      ],
    });

    if (suppi.length > 0) {
      res.status(201).json(suppi);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

supply.get('/detail/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id && Number.isInteger(parseInt(id, 10))) {
      const suppi = await Supply.findAll({
        where: { id: parseInt(id, 10) },
        attributes: ['id', 'name', 'cost', 'promotion', 'discount', 'surcharge', 'amount', 'active', 'commerceId'],
        include: [
          {
            model: Supplier,
            attributes: ['id', 'item', 'name', 'ssn', 'mail', 'phone', 'contact', 'active'],
          },
          {
            model: SuppliesType,
            attributes: ['id', 'type', 'detail', 'active'],
          },
        ],
      });
      if (suppi.length > 0) {
        res.status(201).json(suppi);
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

supply.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      cost,
      promotion,
      discount,
      surcharge,
      supplierId,
      suppliesTypeId,
      unitTypeId,
      amount,
    } = req.body;
    const supplyFinded = await Supply.findOne({
      where: { id: parseInt(id, 10) },
    });
    if (supplyFinded) {
      await supplyFinded.update({
        name: name.toLowerCase(),
        cost,
        promotion,
        discount,
        surcharge,
        supplierId,
        suppliesTypeId,
        unitTypeId,
        amount,
      });
      res.status(200).send('The data was modified successfully');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

supply.put('/active/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const supplyFinded = await Supply.findOne({
      where: { id: parseInt(id, 10) },
    });
    if (supplyFinded) {
      await supplyFinded.update({
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

supply.put('/inactive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const supplyFinded = await Supply.findOne({
      where: { id: parseInt(id, 10) },
    });
    if (supplyFinded) {
      await supplyFinded.update({
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

supply.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = supply;
