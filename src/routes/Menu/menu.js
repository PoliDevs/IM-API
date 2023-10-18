const menu = require('express').Router();
const express = require('express');
const { QueryTypes } = require('sequelize');
const cors = require('cors');
const {
  Menu, MenuType, Commerce, Category,
} = require('../../db');
const { conn: sequelize } = require('../../db');
const { loadMenuType } = require('../../controllers/Menu/loadMenuType');
const { loadCategory } = require('../../controllers/Menu/loadCategory');
const { loadMenu } = require('../../controllers/Menu/loadMenu');
const { loadCommerce } = require('../../controllers/Menu/loadCommerce');
const { loadCommerceFact } = require('../../controllers/Menu/loadCommerceFacts');
const { loadEmployeeType } = require('../../controllers/Menu/loadEmployeeType');
const { loadEmployeer } = require('../../controllers/Menu/loadEmployeer');
const { loadSector } = require('../../controllers/Menu/loadSector');
const { loadPosType } = require('../../controllers/Menu/loadPosType');
const { loadTableService } = require('../../controllers/Menu/loadTableService');
const { loadPos } = require('../../controllers/Menu/loadPos');
const { loadPayment } = require('../../controllers/Menu/loadPayment');
const { loadUnitType } = require('../../controllers/Menu/loadUnitType');

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
      surcharge,
      validity,
      photo,
      commerceId,
      menuTypeId,
      // tableServiceId,
      categoryId,
      dishes,
      product,
      additional,
    } = req.body;
    const costAsNumbers = dishes.cost.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const promotionAsNumbers = dishes.promotion.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const discountAsNumbers = dishes.discount.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const surchargeAsNumbers = dishes.surcharge.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const estimatedTimeAsNumbers = dishes.estimatedTime.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const additionalIdAsNumbers = dishes.additionalId.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? null : parseValue;
    });
    const supplyIdAsNumbers = dishes.supplyId.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? null : parseValue;
    });
    const recipeIdAsNumbers = dishes.recipeId.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? null : parseValue;
    });
    const dishTypeIdAsNumbers = dishes.dishTypeId.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? null : parseValue;
    });
    const unitTypeIdDishAsNumbers = dishes.unitTypeId.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? null : parseValue;
    });
    const newDishes = {
      id: dishes.id || [],
      name: dishes.name || [],
      description: dishes.description || [],
      photo: dishes.photo || [],
      cost: costAsNumbers || [],
      promotion: promotionAsNumbers || [],
      discount: discountAsNumbers || [],
      surcharge: surchargeAsNumbers || [],
      estimatedTime: estimatedTimeAsNumbers || [],
      additionalId: additionalIdAsNumbers || [],
      supplyId: supplyIdAsNumbers || [],
      recipeId: recipeIdAsNumbers || [],
      dishTypeId: dishTypeIdAsNumbers || [],
      date: dishes.date || [],
      unitTypeId: unitTypeIdDishAsNumbers || [],
    };

    const costProductAsNumbers = product.cost.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const supplierIdAsNumbers = product.supplierId.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? null : parseValue;
    });
    const promotionProductAsNumbers = product.promotion.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const discountProductAsNumbers = product.discount.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const surchargeProductAsNumbers = product.surcharge.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const amountProductAsNumbers = product.amount.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const unitTypeIdProdAsNumbers = dishes.unitTypeId.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? null : parseValue;
    });

    const newProduct = {
      id: product.id || [],
      name: product.name || [],
      cost: costProductAsNumbers || [],
      allergeType: product.allergenType || [],
      careful: product.careful || [],
      supplierId: supplierIdAsNumbers || [],
      promotion: promotionProductAsNumbers || [],
      discount: discountProductAsNumbers || [],
      surcharge: surchargeProductAsNumbers || [],
      amount: amountProductAsNumbers || [],
      unitTypeId: unitTypeIdProdAsNumbers || [],
    };

    const costAdditionalAsNumbers = additional.cost.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const promotionAdditionalAsNumbers = additional.promotion.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const discountAdditionalAsNumbers = additional.discount.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const surchargeAdditionalAsNumbers = additional.surcharge.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const amountAdditionalAsNumbers = additional.amount.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const unitTypeIdAddAsNumbers = dishes.unitTypeId.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? null : parseValue;
    });

    const newAdditional = {
      id: additional.id || [],
      name: additional.name || [],
      amount: amountAdditionalAsNumbers || [],
      cost: costAdditionalAsNumbers || [],
      promotion: promotionAdditionalAsNumbers || [],
      discount: discountAdditionalAsNumbers || [],
      surcharge: surchargeAdditionalAsNumbers || [],
      photo: additional.photo || [],
      unitTypeId: unitTypeIdAddAsNumbers || [],
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
        surcharge,
        validity,
        photo,
        commerceId,
        menuTypeId,
        // tableServiceId,
        categoryId,
        dishes: newDishes,
        product: newProduct,
        additional: newAdditional,
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

menu.post('/menuUp/:commerceId', async (req, res) => {
  try {
    let { commerceId: commerceIdParam } = req.params;
    const { menuJSON, commerceJSON } = req.body;
    if (!commerceIdParam && !Number.isInteger(parseInt(commerceIdParam, 10))) {
      res.status(422).send('ID was not provided');
    }
    const objCommerce = {
      commerce: 0,
      commerceFact: 0,
      employeeType: 0,
      employee: 0,
      sector: 0,
      postype: 0,
      tableService: 0,
      payment: 0,
      unitType: 0,
      countPos: 0,
      objPos: [],
    };
    commerceIdParam = Number(commerceIdParam);
    if (commerceIdParam === 0) {
      commerceIdParam = await loadCommerce(commerceJSON);
      objCommerce.commerce = commerceIdParam;
      const newCommerceFacts = await loadCommerceFact(commerceJSON, commerceIdParam);
      objCommerce.commerceFact = newCommerceFacts;
      const newEmployeeType = await loadEmployeeType(commerceIdParam);
      objCommerce.employeeType = newEmployeeType;
      const newEmployee = await loadEmployeer(commerceJSON, commerceIdParam, newEmployeeType);
      objCommerce.employee = newEmployee;
      const newTableService = await loadTableService(commerceIdParam);
      objCommerce.tableService = newTableService;
      const newPosType = await loadPosType(commerceIdParam);
      objCommerce.postype = newPosType;
      const newSector = await loadSector(commerceIdParam, newTableService);
      objCommerce.sector = newSector;
      objCommerce.countPos = commerceJSON[0].mesas;
      const newPayment = await loadPayment(commerceIdParam);
      objCommerce.payment = newPayment;
      const newUnitType = await loadUnitType(commerceIdParam);
      objCommerce.unitType = newUnitType;
      const newPos = await loadPos(
        commerceIdParam,
        newSector,
        newPosType,
        newTableService,
        commerceJSON,
      );
      objCommerce.objPos = newPos;
    }
    const newMenuType = await loadMenuType(menuJSON, commerceIdParam);
    const newCategory = await loadCategory(menuJSON, commerceIdParam);
    const newMenu = await loadMenu(menuJSON, commerceIdParam);
    res.status(201).json({
      type: 'menuUp',
      MenuType: newMenuType,
      Category: newCategory,
      Menu: newMenu,
      CommerceId: commerceIdParam,
      objCommerce,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    res.status(500).send(error);
  }
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
      attributes: ['id', 'date', 'name', 'description', 'status', 'cost', 'promotion', 'discount', 'validity', 'photo', 'dishes', 'active', 'surcharge', 'commerceId', 'product', 'additional'],
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
      attributes: ['id', 'date', 'name', 'description', 'status', 'cost', 'promotion', 'discount', 'validity', 'photo', 'dishes', 'active', 'surcharge', 'commerceId', 'product', 'additional'],
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

menu.get('/lastMenuActive/:commerceId', async (req, res) => {
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
      attributes: ['id', 'date', 'name', 'description', 'status', 'cost', 'promotion', 'discount', 'validity', 'photo', 'dishes', 'active', 'surcharge', 'commerceId', 'product', 'additional'],
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
        // active: true,
        status: 'last',
        commerceId: parseInt(commerceId, 10),
      },
      attributes: ['id', 'date', 'name', 'description', 'status', 'cost', 'promotion', 'discount', 'validity', 'photo', 'dishes', 'active', 'surcharge', 'commerceId', 'product', 'additional'],
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
      attributes: ['id', 'date', 'name', 'description', 'status', 'cost', 'promotion', 'discount', 'validity', 'photo', 'dishes', 'active', 'surcharge', 'commerceId', 'product', 'additional'],
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
        attributes: ['id', 'date', 'name', 'description', 'status', 'cost', 'promotion', 'discount', 'validity', 'photo', 'dishes', 'active', 'surcharge', 'commerceId', 'product', 'surcharge'],
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
        attributes: ['id', 'date', 'name', 'description', 'status', 'cost', 'promotion', 'discount', 'validity', 'photo', 'dishes', 'active', 'surcharge', 'commerceId', 'product', 'additional'],
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
      // tableServiceId,
      categoryId,
      dishes,
      product,
      additional,
    } = req.body;
    const costAsNumbers = dishes.cost.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const promotionAsNumbers = dishes.promotion.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const discountAsNumbers = dishes.discount.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const surchargeAsNumbers = dishes.surcharge.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const estimatedTimeAsNumbers = dishes.estimatedTime.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const additionalIdAsNumbers = dishes.additionalId.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? null : parseValue;
    });
    const supplyIdAsNumbers = dishes.supplyId.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? null : parseValue;
    });
    const recipeIdAsNumbers = dishes.recipeId.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? null : parseValue;
    });
    const dishTypeIdAsNumbers = dishes.dishTypeId.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? null : parseValue;
    });
    const unitTypeIdDishAsNumbers = dishes.unitTypeId.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? null : parseValue;
    });
    const newDishes = {
      id: dishes.id || [],
      name: dishes.name || [],
      description: dishes.description || [],
      photo: dishes.photo || [],
      cost: costAsNumbers || [],
      promotion: promotionAsNumbers || [],
      discount: discountAsNumbers || [],
      surcharge: surchargeAsNumbers || [],
      estimatedTime: estimatedTimeAsNumbers || [],
      additionalId: additionalIdAsNumbers || [],
      supplyId: supplyIdAsNumbers || [],
      recipeId: recipeIdAsNumbers || [],
      dishTypeId: dishTypeIdAsNumbers || [],
      date: dishes.date || [],
      unitTypeId: unitTypeIdDishAsNumbers || [],
    };
    const costProductAsNumbers = product.cost.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const supplierIdAsNumbers = product.supplierId.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? null : parseValue;
    });
    const promotionProductAsNumbers = product.promotion.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const discountProductAsNumbers = product.discount.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const surchargeProductAsNumbers = product.surcharge.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const amountProductAsNumbers = product.amount.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const unitTypeIdProdAsNumbers = dishes.unitTypeId.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? null : parseValue;
    });

    const newProduct = {
      id: product.id || [],
      name: product.name || [],
      cost: costProductAsNumbers || [],
      allergeType: product.allergenType || [],
      careful: product.careful || [],
      supplierId: supplierIdAsNumbers || [],
      promotion: promotionProductAsNumbers || [],
      discount: discountProductAsNumbers || [],
      surcharge: surchargeProductAsNumbers || [],
      amount: amountProductAsNumbers || [],
      unitTypeId: unitTypeIdProdAsNumbers || [],
    };

    const costAdditionalAsNumbers = additional.cost.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const promotionAdditionalAsNumbers = additional.promotion.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const discountAdditionalAsNumbers = additional.discount.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const surchargeAdditionalAsNumbers = additional.surcharge.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const amountAdditionalAsNumbers = additional.amount.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const unitTypeIdAddAsNumbers = dishes.unitTypeId.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? null : parseValue;
    });

    const newAdditional = {
      id: additional.id || [],
      name: additional.name || [],
      amount: amountAdditionalAsNumbers || [],
      cost: costAdditionalAsNumbers || [],
      promotion: promotionAdditionalAsNumbers || [],
      discount: discountAdditionalAsNumbers || [],
      surcharge: surchargeAdditionalAsNumbers || [],
      photo: additional.photo || [],
      unitTypeId: unitTypeIdAddAsNumbers || [],
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
        // tableServiceId,
        categoryId,
        dishes: newDishes,
        product: newProduct,
        additional: newAdditional,
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
