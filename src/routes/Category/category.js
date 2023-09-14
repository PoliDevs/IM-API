const categories = require('express').Router();
const express = require('express');
const cors = require('cors');
const { Category } = require('../../db');

categories.use(express.json());
categories.use(cors());
categories.use(
  express.urlencoded({
    extended: true,
  }),
);

categories.post('/category', async (req, res) => {
  try {
    const { category, detail, commerceId } = req.body;
    // eslint-disable-next-line no-unused-vars
    const [categoryCreated, created] = await Category.findOrCreate({
      where: {
        category: category.toLowerCase(),
        commerceId,
      },
      defaults: {
        category: category.toLowerCase(),
        detail,
        commerceId,
      },
    });
    if (created) {
      res.status(200).send('Category created');
    } else {
      res.status(422).send('Existing Category ');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

categories.get('/all/:commerceId', async (req, res) => {
  try {
    const { commerceId } = req.params;
    if (!commerceId && !Number.isInteger(parseInt(commerceId, 10))) {
      res.status(422).send('ID was not provided');
    }
    const caty = await Category.findAll({
      where: {
        commerceId: parseInt(commerceId, 10),
      },
      attributes: ['id', 'category', 'detail', 'commerceId', 'active'],
    });

    if (caty.length > 0) {
      res.status(201).json(caty);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

categories.get('/all_active/:commerceId', async (req, res) => {
  try {
    const { commerceId } = req.params;
    if (!commerceId && !Number.isInteger(parseInt(commerceId, 10))) {
      res.status(422).send('ID was not provided');
    }
    const caty = await Category.findAll({
      where: {
        commerceId: parseInt(commerceId, 10),
        active: true,
      },
      attributes: ['id', 'category', 'detail', 'commerceId', 'active'],
    });

    if (caty.length > 0) {
      res.status(201).json(caty);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

categories.get('/detail/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id && Number.isInteger(parseInt(id, 10))) {
      const caty = await Category.findAll({
        where: { id: parseInt(id, 10) },
        attributes: ['id', 'category', 'detail', 'commerceId', 'active'],
      });
      if (caty.length > 0) {
        res.status(201).json(caty);
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

categories.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { category, detail, commerceId } = req.body;
    const categoryFinded = await Category.findOne({
      where: { id },
    });
    if (categoryFinded) {
      await categoryFinded.update({
        category,
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

categories.put('/active/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const categoryFinded = await Category.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (categoryFinded) {
      await categoryFinded.update({
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

categories.put('/inactive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const categoryFinded = await Category.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (categoryFinded) {
      await categoryFinded.update({
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

categories.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = categories;
