const order = require('express').Router();
const express = require('express');
const cors = require('cors');
const { Op } = require('sequelize');
const {
  Order, Menu, Pos, Employee, Dish, Account, Payment,
  Commerce, CommerceFact, Bank, Franchise, MenuType,
  TableService, Category, PosType, EmployeeType, Additional, Recipe,
  UnitType,
} = require('../../db');
const { getOrders } = require('../../controllers/order');

order.use(express.json());
order.use(cors());
order.use(
  express.urlencoded({
    extended: true,
  }),
);

order.post('/order', async (req, res) => {
  try {
    let orderes = req.body;
    if (orderes.length > 0) {
      const promises = orderes.map(async (element) => {
        const newOrder = await getOrders(element.date, element.poId, element.commerceId);
        // eslint-disable-next-line no-param-reassign
        // element.order = newOrder;
        const cleanedElement = { ...element };
        if (cleanedElement.menuId === 0) {
          delete cleanedElement.menuId;
        }
        if (cleanedElement.poId === 0) {
          delete cleanedElement.poId;
        }
        if (cleanedElement.employeeId === 0) {
          delete cleanedElement.employeeId;
        }
        if (cleanedElement.dishId === 0) {
          delete cleanedElement.dishId;
        }
        if (cleanedElement.accountId === 0) {
          delete cleanedElement.accountId;
        }
        if (cleanedElement.paymentId === 0) {
          delete cleanedElement.paymentId;
        }
        if (cleanedElement.commerceId === 0) {
          delete cleanedElement.commerceId;
        }
        if (cleanedElement.deliveryId === 0) {
          delete cleanedElement.deliveryId;
        }
        cleanedElement.order = newOrder;
        return cleanedElement;
      });
      orderes = await Promise.all(promises);
      const newPedido = await Order.bulkCreate(orderes);
      if (newPedido.length > 0) {
        res.status(200).send({ mensaje: 'Order created', registros: newPedido.length });
      } else {
        res.status(422).send('Not Order ');
      }
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

order.get('/orderes/:commerceId', async (req, res) => {
  try {
    const { commerceId } = req.params;
    if (!commerceId && !Number.isInteger(parseInt(commerceId, 10))) {
      res.status(422).send('ID was not provided');
    }
    const ord = await Order.findAll({
      attributes: ['id', 'order', 'name', 'date', 'hour', 'status', 'detail', 'validity', 'promotion', 'discount', 'surcharge', 'rating', 'feedback', 'paid'],
      include: [
        {
          model: Menu,
          attributes: ['id', 'date', 'name', 'description', 'status', 'cost', 'promotion', 'discount', 'validity', 'photo', 'dishes', 'active'],
          include: [
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
        },
        {
          model: Commerce,
          where: {
            id: parseInt(commerceId, 10),
          },
          attributes: ['id', 'name', 'neighborhood', 'address', 'workSchedule', 'email', 'phono', 'open', 'active', 'start'],
          include: [
            {
              model: CommerceFact,
              attributes: ['id', 'type', 'detail', 'active'],
            },
            {
              model: Bank,
              attributes: ['id', 'account', 'number', 'detail', 'active'],
            },
            {
              model: Franchise,
              attributes: ['id', 'name', 'detail', 'active'],
            },
          ],
        },
        {
          model: Pos,
          attributes: ['id', 'qrCode', 'active', 'discount', 'surcharge'],
          include: [
            {
              model: PosType,
              attributes: ['id', 'type', 'detail', 'active'],
            },
          ],
        },
        {
          model: Employee,
          attributes: ['id', 'firstName', 'lastName', 'document', 'photo', 'active'],
          include: [
            {
              model: EmployeeType,
              attributes: ['id', 'type', 'detail', 'active'],
            },
          ],
        },
        {
          model: Dish,
          attributes: ['id', 'name', 'description', 'photo', 'cost', 'promotion', 'discount', 'estimatedTime', 'date', 'active'],
          include: [
            {
              model: Additional,
              attributes: ['id', 'name', 'amount', 'cost', 'promotion', 'discount', 'photo', 'active'],
            },
            {
              model: Recipe,
              attributes: ['id', 'name', 'amount', 'date', 'active', 'ingredients', 'supplies'],
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
          model: Account,
          attributes: ['id', 'name', 'phone', 'address', 'birthDate', 'status', 'email', 'validatedEmail', 'googleUser', 'facebookUser', 'twitterUser', 'cp'],
        },
        {
          model: Payment,
          attributes: ['id', 'type', 'detail', 'active'],
        },
      ],
    });

    if (ord.length > 0) {
      res.status(201).json(ord);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    // res.send(error);;
    res.status(500).json({ message: 'Error al obtener los pedidos' });
  }
});

order.get('/detail/:order/:commerceId', async (req, res) => {
  try {
    const orderParam = req.params.order;
    const commerceIdParam = req.params.commerceId;
    const ord = await Order.findAll({
      where: { order: orderParam },
      attributes: ['id', 'order', 'name', 'date', 'hour', 'status', 'detail', 'validity', 'promotion', 'discount', 'surcharge', 'rating', 'feedback', 'paid'],
      include: [
        {
          model: Menu,
          attributes: ['id', 'date', 'name', 'description', 'status', 'cost', 'promotion', 'discount', 'validity', 'photo', 'dishes', 'active'],
          include: [
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
        },
        {
          model: Commerce,
          where: {
            id: parseInt(commerceIdParam, 10),
          },
          attributes: ['id', 'name', 'neighborhood', 'address', 'workSchedule', 'email', 'phono', 'open', 'active', 'start'],
          include: [
            {
              model: CommerceFact,
              attributes: ['id', 'type', 'detail', 'active'],
            },
            {
              model: Bank,
              attributes: ['id', 'account', 'number', 'detail', 'active'],
            },
            {
              model: Franchise,
              attributes: ['id', 'name', 'detail', 'active'],
            },
          ],
        },
        {
          model: Pos,
          attributes: ['id', 'qrCode', 'active', 'discount', 'surcharge'],
          include: [
            {
              model: PosType,
              attributes: ['id', 'type', 'detail', 'active'],
            },
          ],
        },
        {
          model: Employee,
          attributes: ['id', 'firstName', 'lastName', 'document', 'photo', 'active'],
          include: [
            {
              model: EmployeeType,
              attributes: ['id', 'type', 'detail', 'active'],
            },
          ],
        },
        {
          model: Dish,
          attributes: ['id', 'name', 'description', 'photo', 'cost', 'promotion', 'discount', 'estimatedTime', 'date', 'active'],
          include: [
            {
              model: Additional,
              attributes: ['id', 'name', 'amount', 'cost', 'promotion', 'discount', 'photo', 'active'],
            },
            {
              model: Recipe,
              attributes: ['id', 'name', 'amount', 'date', 'active', 'ingredients', 'supplies'],
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
          model: Account,
          attributes: ['id', 'name', 'phone', 'address', 'birthDate', 'status', 'email', 'validatedEmail', 'googleUser', 'facebookUser', 'twitterUser', 'cp'],
        },
        {
          model: Payment,
          attributes: ['id', 'type', 'detail', 'active'],
        },
      ],
    });
    if (ord.length > 0) {
      res.status(201).json(ord);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los pedidos' });
  }
});

order.get('/dates/:commerceId', async (req, res) => {
  try {
    const commerceIdParam = req.params.commerceId;
    const { startDate, endDate } = req.query;
    const ord = await Order.findAll({
      where: {
        date: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
      attributes: ['id', 'order', 'name', 'date', 'hour', 'status', 'detail', 'validity', 'promotion', 'discount', 'surcharge', 'rating', 'feedback', 'paid'],
      include: [
        {
          model: Menu,
          attributes: ['id', 'date', 'name', 'description', 'status', 'cost', 'promotion', 'discount', 'validity', 'photo', 'dishes', 'active'],
          include: [
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
        },
        {
          model: Commerce,
          where: {
            id: parseInt(commerceIdParam, 10),
          },
          attributes: ['id', 'name', 'neighborhood', 'address', 'workSchedule', 'email', 'phono', 'open', 'active', 'start'],
          include: [
            {
              model: CommerceFact,
              attributes: ['id', 'type', 'detail', 'active'],
            },
            {
              model: Bank,
              attributes: ['id', 'account', 'number', 'detail', 'active'],
            },
            {
              model: Franchise,
              attributes: ['id', 'name', 'detail', 'active'],
            },
          ],
        },
        {
          model: Pos,
          attributes: ['id', 'qrCode', 'active', 'discount', 'surcharge'],
          include: [
            {
              model: PosType,
              attributes: ['id', 'type', 'detail', 'active'],
            },
          ],
        },
        {
          model: Employee,
          attributes: ['id', 'firstName', 'lastName', 'document', 'photo', 'active'],
          include: [
            {
              model: EmployeeType,
              attributes: ['id', 'type', 'detail', 'active'],
            },
          ],
        },
        {
          model: Dish,
          attributes: ['id', 'name', 'description', 'photo', 'cost', 'promotion', 'discount', 'estimatedTime', 'date', 'active'],
          include: [
            {
              model: Additional,
              attributes: ['id', 'name', 'amount', 'cost', 'promotion', 'discount', 'photo', 'active'],
            },
            {
              model: Recipe,
              attributes: ['id', 'name', 'amount', 'date', 'active', 'ingredients', 'supplies'],
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
          model: Account,
          attributes: ['id', 'name', 'phone', 'address', 'birthDate', 'status', 'email', 'validatedEmail', 'googleUser', 'facebookUser', 'twitterUser', 'cp'],
        },
        {
          model: Payment,
          attributes: ['id', 'type', 'detail', 'active'],
        },
      ],
    });
    if (ord.length > 0) {
      res.status(201).json(ord);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los pedidos' });
  }
});

order.get('/status/:commerceId', async (req, res) => {
  try {
    const { status } = req.body;
    const { commerceId } = req.params;
    if (!commerceId && !Number.isInteger(parseInt(commerceId, 10))) {
      res.status(422).send('ID was not provided');
    }
    const ord = await Order.findAll({
      where: { status },
      attributes: ['id', 'order', 'name', 'date', 'hour', 'status', 'detail', 'validity', 'promotion', 'discount', 'surcharge', 'rating', 'feedback', 'paid'],
      include: [
        {
          model: Menu,
          attributes: ['id', 'date', 'name', 'description', 'status', 'cost', 'promotion', 'discount', 'validity', 'photo', 'dishes', 'active'],
          include: [
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
        },
        {
          model: Commerce,
          where: {
            id: parseInt(commerceId, 10),
          },
          attributes: ['id', 'name', 'neighborhood', 'address', 'workSchedule', 'email', 'phono', 'open', 'active', 'start'],
          include: [
            {
              model: CommerceFact,
              attributes: ['id', 'type', 'detail', 'active'],
            },
            {
              model: Bank,
              attributes: ['id', 'account', 'number', 'detail', 'active'],
            },
            {
              model: Franchise,
              attributes: ['id', 'name', 'detail', 'active'],
            },
          ],
        },
        {
          model: Pos,
          attributes: ['id', 'qrCode', 'active', 'discount', 'surcharge'],
          include: [
            {
              model: PosType,
              attributes: ['id', 'type', 'detail', 'active'],
            },
          ],
        },
        {
          model: Employee,
          attributes: ['id', 'firstName', 'lastName', 'document', 'photo', 'active'],
          include: [
            {
              model: EmployeeType,
              attributes: ['id', 'type', 'detail', 'active'],
            },
          ],
        },
        {
          model: Dish,
          attributes: ['id', 'name', 'description', 'photo', 'cost', 'promotion', 'discount', 'estimatedTime', 'date', 'active'],
          include: [
            {
              model: Additional,
              attributes: ['id', 'name', 'amount', 'cost', 'promotion', 'discount', 'photo', 'active'],
            },
            {
              model: Recipe,
              attributes: ['id', 'name', 'amount', 'date', 'active', 'ingredients', 'supplies'],
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
          model: Account,
          attributes: ['id', 'name', 'phone', 'address', 'birthDate', 'status', 'email', 'validatedEmail', 'googleUser', 'facebookUser', 'twitterUser', 'cp'],
        },
        {
          model: Payment,
          attributes: ['id', 'type', 'detail', 'active'],
        },
      ],
    });

    if (ord.length > 0) {
      res.status(201).json(ord);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    // res.send(error);;
    res.status(500).json({ message: 'Error al obtener los pedidos' });
  }
});

order.put('/change-status/:order/:commerceId', async (req, res) => {
  try {
    const { order: orderParam, commerceId: commerceIdParam } = req.params;
    const { status } = req.body;
    const [rowsUpdated] = await Order.update({ status }, {
      where: { order: orderParam, commerceId: commerceIdParam },
    });
    if (rowsUpdated > 0) {
      res.status(200).send(status);
    } else {
      res.status(404).send('Order not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

order.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = order;
