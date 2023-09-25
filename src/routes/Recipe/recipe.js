const recipe = require('express').Router();
const express = require('express');
const cors = require('cors');
const {
  Recipe, UnitType,
} = require('../../db');

recipe.use(express.json());
recipe.use(cors());
recipe.use(
  express.urlencoded({
    extended: true,
  }),
);

recipe.post('/recipe', async (req, res) => {
  try {
    const {
      name,
      amount,
      unitTypeId,
      commerceId,
    } = req.body;
    // eslint-disable-next-line no-unused-vars
    const [recipeCreated, created] = await Recipe.findOrCreate({
      where: {
        name: name.toLowerCase(),
        commerceId,
      },
      defaults: {
        name: name.toLowerCase(),
        amount,
        unitTypeId,
        commerceId,
      },
    });
    if (created) {
      res.status(200).send('Recipe created');
    } else {
      res.status(422).send('Existing Recipe ');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

recipe.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      amount,
      unitTypeId,
    } = req.body;
    const recipeFinded = await Recipe.findOne({
      where: { id },
    });
    if (recipeFinded) {
      await recipeFinded.update({
        name: name.toLowerCase(),
        amount,
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

recipe.put('/addproducts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { ingredients, supply } = req.body;

    const recipeFinded = await Recipe.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (recipeFinded) {
      // eslint-disable-next-line no-unused-vars
      const amountsAsNumbers = ingredients.amount.map((amount) => parseFloat(amount));
      const activeAsBooleans = ingredients.active.map((value) => value === '1');
      const updatedIngredients = {
        product: ingredients.product || [],
        active: activeAsBooleans || [],
        detail: ingredients.detail || [],
        amount: amountsAsNumbers || [],
        unit: ingredients.unit || [],
      };

      const amountsAsNumbersS = supply.amount.map((amount) => parseFloat(amount));
      const activeAsBooleansS = supply.active.map((value) => value === '1');
      const updatedSupply = {
        supply: supply.supply || [],
        active: activeAsBooleansS || [],
        detail: supply.detail || [],
        amount: amountsAsNumbersS || [],
        unit: supply.unit || [],
      };

      await recipeFinded.update({
        ingredients: updatedIngredients,
        supplies: updatedSupply,
      });
      res.status(200).send('Product add successfully');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

recipe.get('/all/:commerceId', async (req, res) => {
  try {
    const { commerceId } = req.params;
    if (!commerceId && !Number.isInteger(parseInt(commerceId, 10))) {
      res.status(422).send('ID was not provided');
    }
    const reci = await Recipe.findAll({
      where: {
        commerceId: parseInt(commerceId, 10),
      },
      attributes: ['id', 'date', 'name', 'amount', 'ingredients', 'supplies', 'active', 'commerceId'],
      include: [
        {
          model: UnitType,
          attributes: ['id', 'unit', 'detail', 'active'],
        },
      ],
    });

    if (reci.length > 0) {
      res.status(201).json(reci);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

recipe.get('/all_active/:commerceId', async (req, res) => {
  try {
    const { commerceId } = req.params;
    if (!commerceId && !Number.isInteger(parseInt(commerceId, 10))) {
      res.status(422).send('ID was not provided');
    }
    const reci = await Recipe.findAll({
      where: {
        commerceId: parseInt(commerceId, 10),
        active: true,
      },
      attributes: ['id', 'date', 'name', 'amount', 'ingredients', 'supplies', 'active', 'commerceId'],
      include: [
        {
          model: UnitType,
          attributes: ['id', 'unit', 'detail', 'active'],
        },
      ],
    });

    if (reci.length > 0) {
      res.status(201).json(reci);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

recipe.get('/detail/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id && Number.isInteger(parseInt(id, 10))) {
      const reci = await Recipe.findAll({
        where: { id: parseInt(id, 10) },
        attributes: ['id', 'date', 'name', 'amount', 'ingredients', 'supplies', 'active', 'commerceId'],
        include: [
          {
            model: UnitType,
            attributes: ['id', 'unit', 'detail', 'active'],
          },
        ],
      });
      if (reci.length > 0) {
        res.status(201).json(reci);
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

recipe.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name, amount, unitTypeId,
    } = req.body;
    const recipeFinded = await Recipe.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (recipeFinded) {
      await recipeFinded.update({
        name: name.toLowerCase(),
        amount,
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

recipe.put('/active/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const recipeFinded = await Recipe.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (recipeFinded) {
      await recipeFinded.update({
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

recipe.put('/inactive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const recipeFinded = await Recipe.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (recipeFinded) {
      await recipeFinded.update({
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

recipe.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = recipe;
