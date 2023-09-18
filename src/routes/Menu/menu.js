const menu = require('express').Router();
const express = require('express');
const { QueryTypes } = require('sequelize');
const cors = require('cors');
const {
  Menu, MenuType, Commerce, TableService, Category,
} = require('../../db');
const { conn: sequelize } = require('../../db');

menu.use(express.json());
menu.use(cors());
menu.use(
  express.urlencoded({
    extended: true,
  }),
);

menu.post('/menu', async (req, res) => {
  try {
    const {
      date,
      name,
      description,
      cost,
      promotion,
      discount,
      validity,
      photo,
      commerceId,
      menuTypeId,
      tableServiceId,
      categoryId,
      dishes,
    } = req.body;
    const costAsNumbers = dishes.cost.map((amount) => parseFloat(amount));
    const promotionAsNumbers = dishes.promotion.map((amount) => parseFloat(amount));
    const discountAsNumbers = dishes.discount.map((amount) => parseFloat(amount));
    const estimatedTimeAsNumbers = dishes.estimatedTime.map((amount) => parseFloat(amount));
    const additionalIdAsNumbers = dishes.estimatedTime.map((amount) => parseFloat(amount));
    const supplyIdAsNumbers = dishes.estimatedTime.map((amount) => parseFloat(amount));
    const recipeIdAsNumbers = dishes.estimatedTime.map((amount) => parseFloat(amount));
    const dishTypeIdAsNumbers = dishes.estimatedTime.map((amount) => parseFloat(amount));
    const activeAsBooleans = dishes.active.map((value) => value === '1');
    const newDishes = {
      id: dishes.id || [],
      name: dishes.name || [],
      description: dishes.description || [],
      photo: dishes.photo || [],
      cost: costAsNumbers || [],
      promotion: promotionAsNumbers || [],
      discount: discountAsNumbers || [],
      estimatedTime: estimatedTimeAsNumbers || [],
      active: activeAsBooleans || [],
      additionalId: additionalIdAsNumbers || [],
      supplyId: supplyIdAsNumbers || [],
      recipeId: recipeIdAsNumbers || [],
      dishTypeId: dishTypeIdAsNumbers || [],
      date: dishes.date || [],
    };
    // eslint-disable-next-line no-unused-vars
    const [menuCreated, created] = await Menu.findOrCreate({
      where: {
        name: name.toLowerCase(),
        commerceId,
      },
      defaults: {
        name: name.toLowerCase(),
        date,
        description,
        cost,
        promotion,
        discount,
        validity,
        photo,
        commerceId,
        menuTypeId,
        tableServiceId,
        categoryId,
        dishes: newDishes,
      },
    });
    if (created) {
      res.status(200).send('Menu created');
    } else {
      res.status(422).send('Existing Menu ');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

menu.post('/menuUp', async (req, res) => {
  res.status(201).json('menuUp');
});

menu.get('/all/:commerceId', async (req, res) => {
  try {
    const { commerceId } = req.params;
    if (!commerceId && !Number.isInteger(parseInt(commerceId, 10))) {
      res.status(422).send('ID was not provided');
    }
    const men = await Menu.findAll({
      where: {
        commerceId: parseInt(commerceId, 10),
      },
      attributes: ['id', 'date', 'name', 'description', 'status', 'cost', 'promotion', 'discount', 'validity', 'photo', 'dishes', 'active', 'surcharge', 'commerceId'],
      include: [
        {
          model: Commerce,
          attributes: ['id', 'name', 'neighborhood', 'address', 'workSchedule', 'email', 'phono', 'active', 'franchiseId', 'commercialPlanId', 'businessId', 'open', 'start'],
        },
        {
          model: MenuType,
          attributes: ['id', 'type', 'detail', 'active'],
        },
        {
          model: TableService,
          attributes: ['id', 'type', 'detail', 'cost', 'promotion', 'discount', 'validity', 'active'],
        },
        {
          model: Category,
          attributes: ['id', 'category', 'detail', 'active'],
        },
      ],
    });

    if (men.length > 0) {
      res.status(201).json(men);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

menu.get('/query', async (req, res) => {
  try {
    const recipe = await sequelize.query('SELECT * FROM `recipes`', { type: QueryTypes.SELECT });
    res.json(recipe);
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

menu.get('/all_active/:commerceId', async (req, res) => {
  try {
    const { commerceId } = req.params;
    if (!commerceId && !Number.isInteger(parseInt(commerceId, 10))) {
      res.status(422).send('ID was not provided');
    }
    const men = await Menu.findAll({
      where: {
        commerceId: parseInt(commerceId, 10),
        active: true,
      },
      attributes: ['id', 'date', 'name', 'description', 'status', 'cost', 'promotion', 'discount', 'validity', 'photo', 'dishes', 'active', 'surcharge', 'commerceId'],
      include: [
        {
          model: Commerce,
          attributes: ['id', 'name', 'neighborhood', 'address', 'workSchedule', 'email', 'phono', 'active', 'franchiseId', 'commercialPlanId', 'businessId', 'open', 'start'],
        },
        {
          model: MenuType,
          attributes: ['id', 'type', 'detail', 'active'],
        },
        {
          model: TableService,
          attributes: ['id', 'type', 'detail', 'cost', 'promotion', 'discount', 'validity', 'active'],
        },
        {
          model: Category,
          attributes: ['id', 'category', 'detail', 'active'],
        },
      ],
    });

    if (men.length > 0) {
      res.status(201).json(men);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

menu.get('/lastMenu/:commerceId', async (req, res) => {
  try {
    const { commerceId } = req.params;
    if (!commerceId && !Number.isInteger(parseInt(commerceId, 10))) {
      res.status(422).send('ID was not provided');
    }
    const men = await Menu.findAll({
      where: {
        active: true,
        status: 'last',
        commerceId: parseInt(commerceId, 10),
      },
      attributes: ['id', 'date', 'name', 'description', 'status', 'cost', 'promotion', 'discount', 'validity', 'photo', 'dishes', 'active', 'surcharge', 'commerceId'],
      include: [
        {
          model: Commerce,
          where: {
            active: true,
          },
          attributes: ['id', 'name', 'neighborhood', 'address', 'workSchedule', 'email', 'phono', 'active', 'franchiseId', 'commercialPlanId', 'businessId', 'open', 'start'],
        },
        {
          model: MenuType,
          attributes: ['id', 'type', 'detail', 'active'],
        },
        {
          model: TableService,
          attributes: ['id', 'type', 'detail', 'cost', 'promotion', 'discount', 'validity', 'active'],
        },
        {
          model: Category,
          attributes: ['id', 'category', 'detail', 'active'],
        },
      ],
    });

    if (men.length > 0) {
      res.status(201).json(men);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

menu.get('/menuCommerce/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id && !Number.isInteger(parseInt(id, 10))) {
      res.status(422).send('ID was not provided');
    }
    const men = await Menu.findAll({
      where: {
        active: true,
        id: parseInt(id, 10),
      },
      attributes: ['id', 'date', 'name', 'description', 'status', 'cost', 'promotion', 'discount', 'validity', 'photo', 'dishes', 'active', 'surcharge', 'commerceId'],
      include: [
        {
          model: Commerce,
          attributes: ['id', 'name', 'neighborhood', 'address', 'workSchedule', 'email', 'phono', 'active', 'franchiseId', 'commercialPlanId', 'businessId', 'open', 'start'],
        },
        {
          model: MenuType,
          attributes: ['id', 'type', 'detail', 'active'],
        },
        {
          model: TableService,
          attributes: ['id', 'type', 'detail', 'cost', 'promotion', 'discount', 'validity', 'active'],
        },
        {
          model: Category,
          attributes: ['id', 'category', 'detail', 'active'],
        },
      ],
    });

    if (men.length > 0) {
      res.status(201).json(men);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

menu.get('/detail/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id && Number.isInteger(parseInt(id, 10))) {
      const men = await Menu.findAll({
        where: { id: parseInt(id, 10) },
        attributes: ['id', 'date', 'name', 'description', 'status', 'cost', 'promotion', 'discount', 'validity', 'photo', 'dishes', 'active', 'surcharge', 'commerceId'],
        include: [
          {
            model: Commerce,
            attributes: ['id', 'name', 'neighborhood', 'address', 'workSchedule', 'email', 'phono', 'active', 'franchiseId', 'commercialPlanId', 'businessId', 'open', 'start'],
          },
          {
            model: MenuType,
            attributes: ['id', 'type', 'detail', 'active'],
          },
          {
            model: TableService,
            attributes: ['id', 'type', 'detail', 'cost', 'promotion', 'discount', 'validity', 'active'],
          },
          {
            model: Category,
            attributes: ['id', 'category', 'detail', 'active'],
          },
        ],
      });
      if (men.length > 0) {
        res.status(201).json(men);
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

menu.get('/menuCommerceActive', async (req, res) => {
  try {
    const { commerceId, date } = req.body;
    if (commerceId && Number.isInteger(parseInt(commerceId, 10))) {
      const men = await Menu.findAll({
        where: {
          commerceId: parseInt(commerceId, 10),
          date,
        },
        attributes: ['id', 'date', 'name', 'description', 'status', 'cost', 'promotion', 'discount', 'validity', 'photo', 'dishes', 'active', 'surcharge', 'commerceId'],
        include: [
          {
            model: Commerce,
            // where: {
            //   active: true,
            // },
            attributes: ['id', 'name', 'neighborhood', 'address', 'workSchedule', 'email', 'phono', 'active', 'franchiseId', 'commercialPlanId', 'businessId', 'open', 'start'],
          },
          {
            model: MenuType,
            attributes: ['id', 'type', 'detail', 'active'],
          },
          {
            model: TableService,
            attributes: ['id', 'type', 'detail', 'cost', 'promotion', 'discount', 'validity', 'active'],
          },
          {
            model: Category,
            attributes: ['id', 'category', 'detail', 'active'],
          },
        ],
      });
      if (men.length > 0) {
        res.status(201).json(men);
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

menu.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      date,
      name,
      description,
      status,
      cost,
      promotion,
      discount,
      validity,
      photo,
      commerceId,
      menuTypeId,
      tableServiceId,
      categoryId,
      dishes,
    } = req.body;
    const costAsNumbers = dishes.cost.map((amount) => parseFloat(amount));
    const promotionAsNumbers = dishes.promotion.map((amount) => parseFloat(amount));
    const discountAsNumbers = dishes.discount.map((amount) => parseFloat(amount));
    const estimatedTimeAsNumbers = dishes.estimatedTime.map((amount) => parseFloat(amount));
    const additionalIdAsNumbers = dishes.estimatedTime.map((amount) => parseFloat(amount));
    const supplyIdAsNumbers = dishes.estimatedTime.map((amount) => parseFloat(amount));
    const recipeIdAsNumbers = dishes.estimatedTime.map((amount) => parseFloat(amount));
    const dishTypeIdAsNumbers = dishes.estimatedTime.map((amount) => parseFloat(amount));
    const activeAsBooleans = dishes.active.map((value) => value === '1');
    const newDishes = {
      id: dishes.id || [],
      name: dishes.name || [],
      description: dishes.description || [],
      photo: dishes.photo || [],
      cost: costAsNumbers || [],
      promotion: promotionAsNumbers || [],
      discount: discountAsNumbers || [],
      estimatedTime: estimatedTimeAsNumbers || [],
      active: activeAsBooleans || [],
      additionalId: additionalIdAsNumbers || [],
      supplyId: supplyIdAsNumbers || [],
      recipeId: recipeIdAsNumbers || [],
      dishTypeId: dishTypeIdAsNumbers || [],
      date: dishes.date || [],
    };

    const menuFinded = await Menu.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (menuFinded) {
      await menuFinded.update({
        name: name.toLowerCase(),
        date,
        description,
        status,
        cost,
        promotion,
        discount,
        validity,
        photo,
        commerceId,
        menuTypeId,
        tableServiceId,
        categoryId,
        dishes: newDishes,
      });
      res.status(200).send('The data was modified successfully');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

menu.put('/active/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const menuFinded = await Menu.findOne({
      where: { id: parseInt(id, 10) },
    });
    if (menuFinded) {
      await menuFinded.update({
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

menu.put('/inactive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const menuFinded = await Menu.findOne({
      where: { id: parseInt(id, 10) },
    });
    if (menuFinded) {
      await menuFinded.update({
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

menu.put('/status/:id/:status', async (req, res) => {
  try {
    const { id, status } = req.params;
    const menuFinded = await Menu.findOne({
      where: { id: parseInt(id, 10) },
    });
    if (menuFinded) {
      await menuFinded.update({
        status,
      });
      res.status(200).send(`Change of status to: ${status}`);
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

menu.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = menu;
