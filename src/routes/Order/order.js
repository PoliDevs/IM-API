const order = require('express').Router();
const express = require('express');
const cors = require('cors');
const {
  Order, Menu, Pos, Employee, Dish, Account, Payment,
  Commerce, CommerceFact, Bank, Franchise, MenuType,
  TableService, Category, PosType, EmployeeType, Additional, Recipe,
  UnitType,
} = require('../../db');

order.use(express.json());
order.use(cors());
order.use(
  express.urlencoded({
    extended: true,
  }),
);

order.post('/', async (req, res) => {
  try {
    const {
      date,
      hour,
      status,
      detail,
      validity,
      promotion,
      discount,
      surcharge,
      rating,
      feedback,
      menu,
      pos,
      employee,
      dish,
      account,
      payment,
    } = req.body;
    const menuId = menu
      ? (
        await Menu.findOne({ where: { name: menu } })
      )?.id
      : null;
    const poId = pos
      ? (
        await Pos.findOne({ where: { id: pos } })
      )?.id
      : null;
    const employeeId = employee
      ? (
        await Employee.findOne({ where: { id: employee } })
      )?.id
      : null;
    const dishId = dish
      ? (
        await Dish.findOne({ where: { name: dish } })
      )?.id
      : null;
    const accountId = account
      ? (
        await Account.findOne({ where: { id: account } })
      )?.id
      : null;
    const paymentId = payment
      ? (
        await Payment.findOne({ where: { type: payment } })
      )?.id
      : null;
    // eslint-disable-next-line no-unused-vars
    const create = await Order.create({
      date,
      hour,
      status,
      detail,
      validity,
      promotion,
      discount,
      surcharge,
      rating,
      feedback,
      menuId,
      poId,
      employeeId,
      dishId,
      accountId,
      paymentId,
    });
    if (create) {
      res.status(200).send('Order created');
    } else {
      res.status(422).send('Existing Order ');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

order.get('/all', async (req, res) => {
  try {
    const ord = await Order.findAll({
      attributes: ['id', 'date', 'hour', 'status', 'detail', 'validity', 'promotion', 'discount', 'surcharge', 'rating', 'feedback'],
      include: [
        {
          model: Menu,
          attributes: ['id', 'date', 'name', 'description', 'status', 'cost', 'promotion', 'discount', 'validity', 'photo', 'dishes', 'active'],
          include: [
            {
              model: Commerce,
              attributes: ['id', 'name', 'neighborhood', 'address', 'workSchedule', 'email', 'phono', 'open', 'active'],
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
          model: Pos,
          attributes: ['id', 'qrCode', 'active'],
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
          attributes: ['id', 'name', 'phone', 'address', 'birthDate', 'status', 'email', 'validatedEmail'],
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

order.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id && Number.isInteger(parseInt(id, 10))) {
      const ord = await Order.findAll({
        where: { id: parseInt(id, 10) },
        attributes: ['id', 'date', 'hour', 'status', 'detail', 'validity', 'promotion', 'discount', 'surcharge', 'rating', 'feedback'],
        include: [
          {
            model: Menu,
            attributes: ['id', 'date', 'name', 'description', 'status', 'cost', 'promotion', 'discount', 'validity', 'photo', 'dishes', 'active'],
            include: [
              {
                model: Commerce,
                attributes: ['id', 'name', 'neighborhood', 'address', 'workSchedule', 'email', 'phono', 'open', 'active'],
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
            model: Pos,
            attributes: ['id', 'qrCode', 'active'],
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
            attributes: ['id', 'name', 'phone', 'address', 'birthDate', 'status', 'email', 'validatedEmail'],
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
    } else {
      res.status(422).send('ID was not provided');
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los pedidos' });
  }
});

order.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      date,
      hour,
      status,
      detail,
      validity,
      promotion,
      discount,
      surcharge,
      rating,
      feedback,
      menu,
      pos,
      employee,
      dish,
      account,
      payment,
    } = req.body;
    const menuId = menu
      ? (
        await Menu.findOne({ where: { name: menu } })
      )?.id
      : null;
    const poId = pos
      ? (
        await Pos.findOne({ where: { id: pos } })
      )?.id
      : null;
    const employeeId = employee
      ? (
        await Employee.findOne({ where: { id: employee } })
      )?.id
      : null;
    const dishId = dish
      ? (
        await Dish.findOne({ where: { name: dish } })
      )?.id
      : null;
    const accountId = account
      ? (
        await Account.findOne({ where: { id: account } })
      )?.id
      : null;
    const paymentId = payment
      ? (
        await Payment.findOne({ where: { type: payment } })
      )?.id
      : null;
    const orderFinded = await Order.findOne({
      where: { id },
    });
    if (orderFinded) {
      await orderFinded.update({
        date,
        hour,
        status,
        detail,
        validity,
        promotion,
        discount,
        surcharge,
        rating,
        feedback,
        menuId,
        poId,
        employeeId,
        dishId,
        accountId,
        paymentId,
      });
      res.status(200).send('The data was modified successfully');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

order.put('/orderPlaced/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const orderFinded = await Order.findOne({
      where: { id },
    });
    if (orderFinded) {
      await orderFinded.update({
        status: 'orderPlaced',
      });
      res.status(200).send('orderPlaced');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

order.put('/processingOrder/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const orderFinded = await Order.findOne({
      where: { id },
    });
    if (orderFinded) {
      await orderFinded.update({
        status: 'processingOrder',
      });
      res.status(200).send('processingOrder');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

order.put('/orderInPreparation/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const orderFinded = await Order.findOne({
      where: { id },
    });
    if (orderFinded) {
      await orderFinded.update({
        status: 'orderInPreparation',
      });
      res.status(200).send('orderInPreparation');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

order.put('/orderReady/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const orderFinded = await Order.findOne({
      where: { id },
    });
    if (orderFinded) {
      await orderFinded.update({
        status: 'orderReady',
      });
      res.status(200).send('orderReady');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

order.put('/delivered/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const orderFinded = await Order.findOne({
      where: { id },
    });
    if (orderFinded) {
      await orderFinded.update({
        status: 'delivered',
      });
      res.status(200).send('delivered');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

order.put('/canceled/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const orderFinded = await Order.findOne({
      where: { id },
    });
    if (orderFinded) {
      await orderFinded.update({
        status: 'canceled',
      });
      res.status(200).send('canceled');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = order;
