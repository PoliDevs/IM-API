const delivery = require('express').Router();
const express = require('express');
const path = require('path');
const cors = require('cors');
const { Delivery } = require('../../db');

delivery.use(express.json());
delivery.use(cors());
delivery.use(
  express.urlencoded({
    extended: true,
  }),
);
delivery.use('/images', express.static(path.join(__dirname, 'src', 'img', 'logos')));

delivery.post('/delivery', async (req, res) => {
  try {
    const {
      name,
      detail,
      company,
      account,
      start,
      promotion,
      discount,
      surcharge,
      fee,
      logo,
      commerceId,
    } = req.body;
    // eslint-disable-next-line no-unused-vars
    const [deliveryCreated, created] = await Delivery.findOrCreate({
      where: {
        name: name.toLowerCase(),
        commerceId,
      },
      defaults: {
        name: name.toLowerCase(),
        detail,
        company,
        account,
        start,
        promotion,
        discount,
        surcharge,
        fee,
        logo: `${logo}`,
        commerceId,
      },
    });
    if (created) {
      res.status(200).send('Delivery created');
    } else {
      res.status(422).send('Existing Delivery ');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

delivery.get('/all/:commerceId', async (req, res) => {
  try {
    const { commerceId } = req.params;
    if (!commerceId && !Number.isInteger(parseInt(commerceId, 10))) {
      res.status(422).send('ID was not provided');
    }
    const deliveryi = await Delivery.findAll({
      where: {
        commerceId: parseInt(commerceId, 10),
      },
      attributes: ['id', 'name', 'detail', 'company', 'account', 'start', 'promotion', 'discount', 'surcharge', 'fee', 'logo', 'active', 'commerceId'],
    });

    if (deliveryi.length > 0) {
      res.status(201).json(deliveryi);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

delivery.get('/all_active/:commerceId', async (req, res) => {
  try {
    const { commerceId } = req.params;
    if (!commerceId && !Number.isInteger(parseInt(commerceId, 10))) {
      res.status(422).send('ID was not provided');
    }
    const deliveryi = await Delivery.findAll({
      where: {
        commerceId: parseInt(commerceId, 10),
        active: true,
      },
      attributes: ['id', 'name', 'detail', 'company', 'account', 'start', 'promotion', 'discount', 'surcharge', 'fee', 'logo', 'active', 'commerceId'],
    });

    if (deliveryi.length > 0) {
      res.status(201).json(deliveryi);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

delivery.get('/delivery/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id && Number.isInteger(parseInt(id, 10))) {
      const deliveryi = await Delivery.findAll({
        where: { id: parseInt(id, 10) },
        attributes: ['id', 'name', 'detail', 'company', 'account', 'start', 'promotion', 'discount', 'surcharge', 'fee', 'logo', 'active', 'commerceId'],
      });
      if (deliveryi.length > 0) {
        res.status(201).json(deliveryi);
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

delivery.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      detail,
      company,
      account,
      start,
      promotion,
      discount,
      surcharge,
      fee,
      logo,
      commerceId,
    } = req.body;
    const deliveryFinded = await Delivery.findOne({
      where: { id },
    });
    if (deliveryFinded) {
      await deliveryFinded.update({
        name: name.toLowerCase(),
        detail,
        company,
        account,
        start,
        promotion,
        discount,
        surcharge,
        fee,
        logo: `${logo}`,
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

delivery.put('/active/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deliveryFinded = await Delivery.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (deliveryFinded) {
      await deliveryFinded.update({
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

delivery.put('/inactive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deliveryFinded = await Delivery.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (deliveryFinded) {
      await deliveryFinded.update({
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

delivery.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = delivery;
