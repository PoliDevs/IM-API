const delivery = require('express').Router();
const express = require('express');
const path = require('path');
const cors = require('cors');
const { Delivery, Courier, CourierType } = require('../../db');

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
      courierId,
      promotion,
      discount,
      surcharge,
      fee,
      logo,
    } = req.body;
    // eslint-disable-next-line no-unused-vars
    const [deliveryCreated, created] = await Delivery.findOrCreate({
      where: {
        name: name.toLowerCase(),
      },
      defaults: {
        name: name.toLowerCase(),
        detail,
        company,
        account,
        start,
        courierId,
        promotion,
        discount,
        surcharge,
        fee,
        logo: `/${logo}`,
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

delivery.get('/all', async (req, res) => {
  try {
    const deliveryi = await Delivery.findAll({
      attributes: ['id', 'name', 'detail', 'company', 'account', 'start', 'promotion', 'discount', 'surcharge', 'fee', 'logo', 'active'],
      include: [
        {
          model: Courier,
          attributes: ['id', 'firstName', 'lastName', 'document', 'address', 'cp', 'bank', 'account', 'detail', 'start', 'promotion', 'discount', 'surcharge', 'fee', 'active'],
          include: [
            {
              model: CourierType,
              attributes: ['id', 'type', 'detail', 'active'],
            },
          ],
        },
      ],
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

delivery.get('/all_active', async (req, res) => {
  try {
    const deliveryi = await Delivery.findAll({
      where: { active: true },
      attributes: ['id', 'name', 'detail', 'company', 'account', 'start', 'promotion', 'discount', 'surcharge', 'fee', 'logo', 'active'],
      include: [
        {
          model: Courier,
          attributes: ['id', 'firstName', 'lastName', 'document', 'address', 'cp', 'bank', 'account', 'detail', 'start', 'promotion', 'discount', 'surcharge', 'fee', 'active'],
          include: [
            {
              model: CourierType,
              attributes: ['id', 'type', 'detail', 'active'],
            },
          ],
        },
      ],
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
        attributes: ['id', 'name', 'detail', 'company', 'account', 'start', 'promotion', 'discount', 'surcharge', 'fee', 'logo', 'active'],
        include: [
          {
            model: Courier,
            attributes: ['id', 'firstName', 'lastName', 'document', 'address', 'cp', 'bank', 'account', 'detail', 'start', 'promotion', 'discount', 'surcharge', 'fee', 'active'],
            include: [
              {
                model: CourierType,
                attributes: ['id', 'type', 'detail', 'active'],
              },
            ],
          },
        ],
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
      courierId,
      promotion,
      discount,
      surcharge,
      fee,
      logo,
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
        courierId,
        promotion,
        discount,
        surcharge,
        fee,
        logo: `/${logo}`,
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
      where: { id },
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
      where: { id },
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
