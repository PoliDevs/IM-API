const dish = require('express').Router();
const express = require('express');
const cors = require('cors');
const {
  Dish, DishType, Additional, Supply, Recipe, Supplier, SuppliesType, UnitType, Commerce,
} = require('../../db');

dish.use(express.json());
dish.use(cors());
dish.use(
  express.urlencoded({
    extended: true,
  }),
);

dish.post('/dish', async (req, res) => {
  try {
    const {
      name, description, photo, cost, promotion,
      discount, estimatedTime, type, additional, supply, recipe, commerce,
    } = req.body;
    const dishType = type
      ? (
        await DishType.findOne({ where: { type } })
      )?.id
      : null;
    const dishAdditional = name
      ? (
        await Additional.findOne({ where: { name: additional } })
      )?.id
      : null;
    const dishSupply = name
      ? (
        await Supply.findOne({ where: { name: supply } })
      )?.id
      : null;
    const dishRecipe = name
      ? (
        await Recipe.findOne({ where: { name: recipe } })
      )?.id
      : null;
    const commerceId = commerce
      ? (
        await Commerce.findOne({ where: { name: commerce } })
      )?.id
      : null;
    // eslint-disable-next-line no-unused-vars
    const [dishCreated, created] = await Dish.findOrCreate({
      where: {
        name: name.toLowerCase(),
      },
      defaults: {
        name: name.toLowerCase(),
        description,
        photo,
        cost,
        promotion,
        discount,
        estimatedTime,
        dishTypeId: dishType,
        additionalId: dishAdditional,
        supplyId: dishSupply,
        recipeId: dishRecipe,
        commerceId,
      },
    });
    if (created) {
      res.status(200).send('Dish created');
    } else {
      res.status(422).send('Existing Dish ');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

dish.get('/all', async (req, res) => {
  try {
    const dis = await Dish.findAll({
      attributes: ['id', 'date', 'name', 'description', 'photo', 'cost', 'promotion', 'discount', 'estimatedTime', 'active'],
      include: [
        {
          model: DishType,
          attributes: ['id', 'type', 'detail', 'photo', 'active'],
        },
        {
          model: Additional,
          attributes: ['id', 'name', 'amount', 'cost', 'promotion', 'discount', 'photo', 'active'],
        },
        {
          model: Supply,
          attributes: ['id', 'name', 'cost', 'promotion', 'discount', 'active'],
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
        },
        {
          model: Recipe,
          attributes: ['id', 'date', 'name', 'amount', 'ingredients', 'supplies', 'active'],
          include: [
            {
              model: UnitType,
              attributes: ['id', 'unit', 'detail', 'active'],
            },
          ],
        },
        {
          model: Commerce,
          attributes: ['id', 'name', 'neighborhood', 'address', 'active'],
        },
      ],
    });

    if (dis.length > 0) {
      res.status(201).json(dis);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

dish.get('/all_active', async (req, res) => {
  try {
    const dis = await Dish.findAll({
      where: { active: true },
      attributes: ['id', 'date', 'name', 'description', 'photo', 'cost', 'promotion', 'discount', 'estimatedTime', 'active'],
      include: [
        {
          model: DishType,
          attributes: ['id', 'type', 'detail', 'photo', 'active'],
        },
        {
          model: Additional,
          attributes: ['id', 'name', 'amount', 'cost', 'promotion', 'discount', 'photo', 'active'],
        },
        {
          model: Supply,
          attributes: ['id', 'name', 'cost', 'promotion', 'discount', 'active'],
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
        },
        {
          model: Recipe,
          attributes: ['id', 'date', 'name', 'amount', 'ingredients', 'supplies', 'active'],
          include: [
            {
              model: UnitType,
              attributes: ['id', 'unit', 'detail', 'active'],
            },
          ],
        },
        {
          model: Commerce,
          attributes: ['id', 'name', 'neighborhood', 'address', 'active'],
        },
      ],
    });

    if (dis.length > 0) {
      res.status(201).json(dis);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

dish.get('/detail/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id && Number.isInteger(parseInt(id, 10))) {
      const dis = await Dish.findAll({
        where: { id: parseInt(id, 10) },
        attributes: ['id', 'date', 'name', 'description', 'photo', 'cost', 'promotion', 'discount', 'estimatedTime', 'active'],
        include: [
          {
            model: DishType,
            attributes: ['id', 'type', 'detail', 'photo', 'active'],
          },
          {
            model: Additional,
            attributes: ['id', 'name', 'amount', 'cost', 'promotion', 'discount', 'photo', 'active'],
          },
          {
            model: Supply,
            attributes: ['id', 'name', 'cost', 'promotion', 'discount', 'active'],
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
          },
          {
            model: Recipe,
            attributes: ['id', 'date', 'name', 'amount', 'ingredients', 'supplies', 'active'],
            include: [
              {
                model: UnitType,
                attributes: ['id', 'unit', 'detail', 'active'],
              },
            ],
          },
          {
            model: Commerce,
            attributes: ['id', 'name', 'neighborhood', 'address', 'active'],
          },
        ],
      });
      if (dis.length > 0) {
        res.status(201).json(dis);
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

dish.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name, description, photo, cost, promotion,
      discount, estimatedTime, type, additional, supply, recipe,
    } = req.body;
    const dishType = type
      ? (
        await DishType.findOne({ where: { type } })
      )?.id
      : null;
    const dishAdditional = name
      ? (
        await Additional.findOne({ where: { name: additional } })
      )?.id
      : null;
    const dishSupply = name
      ? (
        await Supply.findOne({ where: { name: supply } })
      )?.id
      : null;
    const dishRecipe = name
      ? (
        await Recipe.findOne({ where: { name: recipe } })
      )?.id
      : null;
    const dishFinded = await Dish.findOne({
      where: { id },
    });
    if (dishFinded) {
      await dishFinded.update({
        name: name.toLowerCase(),
        description,
        photo,
        cost,
        promotion,
        discount,
        estimatedTime,
        dishTypeId: dishType,
        additionalId: dishAdditional,
        supplyId: dishSupply,
        recipeId: dishRecipe,
      });
      res.status(200).send('The data was modified successfully');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

dish.put('/active/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const dishFinded = await Dish.findOne({
      where: { id },
    });
    if (dishFinded) {
      await dishFinded.update({
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

dish.put('/inactive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const dishFinded = await Dish.findOne({
      where: { id },
    });
    if (dishFinded) {
      await dishFinded.update({
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

dish.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = dish;
