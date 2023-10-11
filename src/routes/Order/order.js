const order = require('express').Router();
const express = require('express');
const { QueryTypes } = require('sequelize');
const cors = require('cors');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { sendToEmail } = require('../../controllers/nodemailer/sendEmail');

const {
  Order, Menu, Pos, Employee, Dish, Account, Payment,
  Commerce, CommerceFact, Bank, Franchise, MenuType,
  TableService, Category, PosType, EmployeeType, Additional, Recipe,
  UnitType, Delivery, Courier, CourierType, Sector, Product,
} = require('../../db');

const { getOrders } = require('../../controllers/Order/order');
const { conn: sequelize } = require('../../db');

order.use(express.json());
order.use(cors());
order.use(
  express.urlencoded({
    extended: true,
  }),
);

function sendNewOrder(
  to,
  names,
  newOrder,
  laCuenta,
  enUnosMinutos,
  tuPago,
  apreciamos,
  necesitasAyuda,
  subject,
  text,
) {
  const filePath = path.join(__dirname, '../../controllers/nodemailer/Order/order/order.html');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error('Error al leer el archivo HTML', err);
      return;
    }
    const htmlContent = data.replace('{name}', names)
      .replace('{ordeR}', newOrder)
      .replace('{laCuenta}', laCuenta)
      .replace('{enUnosMinutos}', enUnosMinutos)
      .replace('{tuPago}', tuPago)
      .replace('{apreciamos}', apreciamos)
      .replace('{necesitasAyuda}', necesitasAyuda);
    const info = {
      from: 'imenunotice@gmail.com',
      to,
      subject,
      text,
      html: htmlContent,
    };
    sendToEmail(info);
  });
}

order.post('/new', async (req, res) => {
  try {
    const {
      name,
      date,
      hour,
      detail,
      validity,
      promotion,
      discount,
      surcharge,
      poId,
      employeeId,
      accountId,
      paymentId,
      paid,
      commerceId,
      deliveryId,
      costDelivery,
      courierId,
      sectorId,
      additionals,
      products,
      dishes,
      menu,
      accountemail,
      accountname,
      // eslint-disable-next-line no-unused-vars
      accountphone,
      // eslint-disable-next-line no-unused-vars
      accountbirthDate,
      // eslint-disable-next-line no-unused-vars
      accountaddress,
      googleEmail,
      mpPayment,
    } = req.body;

    const costProductAsNumbers = products.cost.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const unitTypeProductAsNumbers = products.unitTypeId.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? null : parseValue;
    });
    const productTypeAsNumbers = products.productTypeId.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? null : parseValue;
    });
    const supplierIdAsNumbers = products.supplierId.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? null : parseValue;
    });
    const promotionProductAsNumbers = products.promotion.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const discountProductAsNumbers = products.discount.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const surchargeProductAsNumbers = products.surcharge.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const amountProductAsNumbers = products.amount.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });

    const newProduct = {
      id: products.id || [],
      name: products.name || [],
      cost: costProductAsNumbers || [],
      unitTypeId: unitTypeProductAsNumbers || [],
      productTypeId: productTypeAsNumbers || [],
      supplierId: supplierIdAsNumbers || [],
      promotion: promotionProductAsNumbers || [],
      discount: discountProductAsNumbers || [],
      surcharge: surchargeProductAsNumbers || [],
      amount: amountProductAsNumbers || [],
      allergenType: products.allergenType || [],
      careful: products.careful || [],
      detail: products.detail || [],
    };

    const unitTypeAdditionalAsNumbers = additionals.unitTypeId.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? null : parseValue;
    });
    const costAdditionalAsNumbers = additionals.cost.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const promotionAdditionalAsNumbers = additionals.promotion.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const discountAdditionalAsNumbers = additionals.discount.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const surchargeAdditionalAsNumbers = additionals.surcharge.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const amountAdditionalAsNumbers = additionals.amount.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });

    const newAdditional = {
      id: additionals.id || [],
      name: additionals.name || [],
      amount: amountAdditionalAsNumbers || [],
      cost: costAdditionalAsNumbers || [],
      promotion: promotionAdditionalAsNumbers || [],
      discount: discountAdditionalAsNumbers || [],
      surcharge: surchargeAdditionalAsNumbers || [],
      unitTypeId: unitTypeAdditionalAsNumbers || [],
      detail: additionals.detail || [],
    };

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
    const amountAddInDishesAsNumbers = dishes.amountAdditional.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const amountSuppInDishesAsNumbers = dishes.amountSupplies.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const amountDishesAsNumbers = dishes.amount.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
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
      amountAdditional: amountAddInDishesAsNumbers || [],
      amountSupplies: amountSuppInDishesAsNumbers || [],
      amount: amountDishesAsNumbers || [],
      detail: dishes.detail || [],
    };

    const costMenuAsNumbers = menu.cost.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const promotionMenuAsNumbers = menu.promotion.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const discountMenuAsNumbers = menu.discount.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const surchargeMenuAsNumbers = menu.surcharge.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const menuTypeIdAsNumbers = menu.menuTypeId.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? null : parseValue;
    });
    const categoryAsNumbers = menu.categoryId.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? null : parseValue;
    });
    const amountAsNumbers = menu.amount.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });

    const newMenu = {
      id: menu.id || [],
      name: menu.name || [],
      description: menu.description || [],
      cost: costMenuAsNumbers || [],
      promotion: promotionMenuAsNumbers || [],
      discount: discountMenuAsNumbers || [],
      surcharge: surchargeMenuAsNumbers || [],
      menuTypeId: menuTypeIdAsNumbers || [],
      categoryId: categoryAsNumbers || [],
      dishes: menu.dishes || [],
      product: menu.product || [],
      additional: menu.additional || [],
      amount: amountAsNumbers || [],
      detail: menu.detail || [],
    };

    const newOrder = await getOrders(
      date,
      poId,
      commerceId,
      sectorId,
    );
    // eslint-disable-next-line no-unused-vars
    const orderes = await Promise.all(newOrder);
    // eslint-disable-next-line no-unused-vars
    const created = await Order.create({
      name,
      date,
      hour,
      status: 'orderPlaced',
      detail,
      validity,
      promotion,
      discount,
      surcharge,
      rating: 5,
      feedback: '',
      poId,
      employeeId,
      accountId,
      paymentId,
      paid,
      order: newOrder,
      commerceId,
      deliveryId,
      costDelivery,
      courierId,
      sectorId,
      additionals: newAdditional,
      products: newProduct,
      dishes: newDishes,
      menu: newMenu,
      // accountemail,
      // accountname,
      // accountphone,
      // accountbirthDate,
      // accountaddress,
      googleEmail,
      mpPayment,

    });
    if (created) {
      const to = accountemail || googleEmail;
      const names = accountname || '';
      if (accountemail || googleEmail) {
        const laCuenta = '¡La cuenta regresiva ha comenzado!';
        const enUnosMinutos = 'En unos minutos, tendrás tu pedido en las manos.';
        const subject = 'iMenu - Pedido en marcha! 🍔';
        const text = 'Pedido en marcha! 🍔';
        const tuPago = 'Tu pago se ha procesado con éxito.';
        const apreciamos = 'Apreciamos tu confianza en iMenu';
        const necesitasAyuda = '¿Necestas ayuda?';
        sendNewOrder(
          to,
          names,
          newOrder,
          laCuenta,
          enUnosMinutos,
          tuPago,
          apreciamos,
          necesitasAyuda,
          subject,
          text,
        );
      }
      res.status(200).json({ mensaje: 'Order created', order: newOrder, id: created.dataValues.id });
    } else {
      res.status(422).send('Existing Order');
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
      where: {
        commerceId: parseInt(commerceId, 10),
      },
      attributes: [
        'id', 'order', 'date', 'hour', 'status', 'detail', 'promotion',
        'discount', 'surcharge', 'costDelivery', 'paid', 'name',
        'additionals', 'products', 'dishes', 'menu', 'googleEmail',
      ],
      include: [
        {
          model: Pos,
          attributes: ['id', 'name', 'promotion', 'discount', 'surcharge'],
        },
        {
          model: Employee,
          attributes: ['id', 'firstName', 'lastName', 'photo'],
        },
        {
          model: Delivery,
          attributes: ['id', 'name', 'company', 'logo', 'promotion', 'discount', 'surcharge', 'fee'],
        },
        {
          model: Courier,
          attributes: ['id', 'firstName', 'lastName', 'promotion', 'discount', 'surcharge', 'fee'],
        },
        {
          model: Sector,
          attributes: ['id', 'name', 'promotion', 'discount', 'surcharge'],
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

order.post('/order', async (req, res) => {
  try {
    let orderes = req.body;
    if (orderes.length > 0) {
      let newOrder;
      const promises = orderes.map(async (element) => {
        newOrder = await getOrders(
          element.date,
          element.poId,
          element.commerceId,
          element.sectorId,
        );
        // eslint-disable-next-line no-param-reassign
        // element.order = newOrder;
        const cleanedElement = { ...element };
        if (cleanedElement.menuId === 0) {
          delete cleanedElement.menuId;
        }
        if (cleanedElement.poId === 0) {
          delete cleanedElement.poId;
        }
        if (cleanedElement.sectorId === 0) {
          delete cleanedElement.sectorId;
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
        if (cleanedElement.courierId === 0) {
          delete cleanedElement.courierId;
        }
        if (cleanedElement.costDelivery === 0) {
          delete cleanedElement.costDelivery;
        }
        if (cleanedElement.productId === 0) {
          delete cleanedElement.productId;
        }
        if (cleanedElement.additionalId === 0) {
          delete cleanedElement.additionalId;
        }
        cleanedElement.order = newOrder;
        return cleanedElement;
      });
      orderes = await Promise.all(promises);
      const newPedido = await Order.bulkCreate(orderes);
      if (newPedido.length > 0) {
        const to = orderes[0].accountemail || orderes[0].googleEmail;
        const name = orderes[0].accountname || '';
        // eslint-disable-next-line prefer-destructuring
        const ordeR = orderes[0].order;
        const filePath = path.join(__dirname, '../../controllers/nodemailer/Order/order.html');
        if (orderes[0].accountemail || orderes[0].googleEmail) {
          fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
              // eslint-disable-next-line no-console
              console.error('Error al leer el archivo HTML', err);
              return;
            }
            const htmlContent = data.replace('{name}', name).replace('{ordeR}', ordeR);
            const info = {
              from: 'imenunotice@gmail.com',
              to,
              subject: 'iMenu - Pedido en marcha! 🍔',
              text: 'Pedido en marcha! 🍔',
              html: htmlContent,
            };
            sendToEmail(info);
          });
        }
        res.status(200).send({
          mensaje: 'Order created',
          registros: newPedido.length,
          order: newOrder,
          email: orderes[0].accountemail || orderes[0].googleEmail,
        });
      } else {
        res.status(422).send('Not Order ');
      }
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

order.get('/orderes2/:commerceId', async (req, res) => {
  try {
    const { commerceId } = req.params;
    if (!commerceId && !Number.isInteger(parseInt(commerceId, 10))) {
      res.status(422).send('ID was not provided');
    }
    const ord = await Order.findAll({
      where: {
        commerceId: parseInt(commerceId, 10),
      },
      attributes: ['id', 'order', 'name', 'date', 'hour', 'status', 'detail', 'validity', 'promotion', 'discount', 'surcharge', 'rating', 'feedback', 'paid', 'costDelivery'],
      include: [
        {
          model: Menu,
          attributes: ['id', 'date', 'name', 'description', 'status', 'cost', 'promotion', 'discount', 'validity', 'photo', 'dishes', 'surcharge', 'active'],
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
          attributes: ['id', 'name', 'neighborhood', 'address', 'workSchedule', 'email', 'phono', 'active', 'franchiseId', 'commercialPlanId', 'businessId', 'open', 'start'],
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
        {
          model: Delivery,
          attributes: ['id', 'name', 'detail', 'company', 'account', 'start', 'promotion', 'discount', 'surcharge', 'fee', 'logo', 'active'],
        },
        {
          model: Courier,
          attributes: ['id', 'firstName', 'lastName', 'document', 'address', 'cp', 'bank', 'account', 'detail', 'start', 'promotion', 'discount', 'surcharge', 'fee', 'active'],
          include: [
            {
              model: CourierType,
              attributes: ['id', 'type'],
            },
          ],
        },
        {
          model: Additional,
          attributes: ['id', 'name', 'amount', 'cost', 'promotion', 'discount', 'photo', 'active'],
        },
        {
          model: Sector,
          attributes: ['id', 'name', 'discount', 'surcharge', 'capacity', 'qrCode', 'detail', 'commerceId', 'active'],
        },
        {
          model: Product,
          attributes: ['id', 'name', 'photo', 'stock', 'pointOrder', 'cost', 'allergenType', 'careful', 'active', 'commerceId'],
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

order.get('/detail/:order', async (req, res) => {
  try {
    const orderParam = req.params.order;
    const ord = await Order.findAll({
      where: { order: orderParam },
      attributes: [
        'id', 'order', 'date', 'hour', 'status', 'detail', 'promotion',
        'discount', 'surcharge', 'costDelivery', 'paid', 'name',
        'additionals', 'products', 'dishes', 'menu', 'googleEmail', 'mpPayment',
      ],
      include: [
        {
          model: Pos,
          attributes: ['id', 'name', 'promotion', 'discount', 'surcharge'],
        },
        {
          model: Employee,
          attributes: ['id', 'firstName', 'lastName', 'photo'],
        },
        {
          model: Delivery,
          attributes: ['id', 'name', 'company', 'logo', 'promotion', 'discount', 'surcharge', 'fee'],
        },
        {
          model: Courier,
          attributes: ['id', 'firstName', 'lastName', 'promotion', 'discount', 'surcharge', 'fee'],
        },
        {
          model: Sector,
          attributes: ['id', 'name', 'promotion', 'discount', 'surcharge'],
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
          commerceId: parseInt(commerceIdParam, 10),
        },
      },
      attributes: [
        'id', 'order', 'date', 'hour', 'status', 'detail', 'promotion',
        'discount', 'surcharge', 'costDelivery', 'paid', 'name',
        'additionals', 'products', 'dishes', 'menu', 'googleEmail', 'mpPayment',
      ],
      include: [
        {
          model: Pos,
          attributes: ['id', 'name', 'promotion', 'discount', 'surcharge'],
        },
        {
          model: Employee,
          attributes: ['id', 'firstName', 'lastName', 'photo'],
        },
        {
          model: Delivery,
          attributes: ['id', 'name', 'company', 'logo', 'promotion', 'discount', 'surcharge', 'fee'],
        },
        {
          model: Courier,
          attributes: ['id', 'firstName', 'lastName', 'promotion', 'discount', 'surcharge', 'fee'],
        },
        {
          model: Sector,
          attributes: ['id', 'name', 'promotion', 'discount', 'surcharge'],
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
      where: {
        status,
        commerceId: parseInt(commerceId, 10),
      },
      attributes: [
        'id', 'order', 'date', 'hour', 'status', 'detail', 'promotion',
        'discount', 'surcharge', 'costDelivery', 'paid', 'name',
        'additionals', 'products', 'dishes', 'menu',
      ],
      include: [
        {
          model: Pos,
          attributes: ['id', 'name', 'promotion', 'discount', 'surcharge'],
        },
        {
          model: Employee,
          attributes: ['id', 'firstName', 'lastName', 'photo'],
        },
        {
          model: Delivery,
          attributes: ['id', 'name', 'company', 'logo', 'promotion', 'discount', 'surcharge', 'fee'],
        },
        {
          model: Courier,
          attributes: ['id', 'firstName', 'lastName', 'promotion', 'discount', 'surcharge', 'fee'],
        },
        {
          model: Sector,
          attributes: ['id', 'name', 'promotion', 'discount', 'surcharge'],
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

order.put('/status-ready/:order/:commerceId', async (req, res) => {
  try {
    const { order: orderParam, commerceId: commerceIdParam } = req.params;
    const {
      status, accountemail, googleEmail, accountname,
    } = req.body;
    const [rowsUpdated] = await Order.update({ status }, {
      where: { order: orderParam, commerceId: commerceIdParam, status: 'orderInPreparation' },
    });
    if (rowsUpdated > 0) {
      if (status === 'orderReady') {
        const to = accountemail || googleEmail;
        const names = accountname || '';
        if (accountemail || googleEmail) {
          const laCuenta = '¡Ya está tu Pedido!';
          const enUnosMinutos = '';
          const subject = 'iMenu - Tu Pedido está Listo! 🍔';
          const text = 'Tu Pedido está Listo! 🍔';
          const tuPago = 'Que disfrutes tu Pedido!';
          const apreciamos = '';
          const necesitasAyuda = '¿Necestas ayuda?';
          sendNewOrder(
            to,
            names,
            orderParam,
            laCuenta,
            enUnosMinutos,
            tuPago,
            apreciamos,
            necesitasAyuda,
            subject,
            text,
          );
        }
      }
      res.status(200).send(status);
    } else {
      res.status(404).send('Order not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

order.put('/change-status/:order/:commerceId', async (req, res) => {
  try {
    const { order: orderParam, commerceId: commerceIdParam } = req.params;
    const {
      status,
    } = req.body;
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

order.put('/updateDetail/:order/:id/:commerceId', async (req, res) => {
  try {
    const {
      order: orderParam,
      commerceId: commerceIdParam,
      id,
    } = req.params;
    const { detail } = req.body;
    const [rowsUpdated] = await Order.update({ detail }, {
      where: { order: orderParam, commerceId: commerceIdParam, id },
    });
    if (rowsUpdated > 0) {
      res.status(200).send(`Modified detail of order: ${orderParam}`);
    } else {
      res.status(404).send('Order not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

order.put('/updateValidity/:order/:id/:commerceId', async (req, res) => {
  try {
    const {
      order: orderParam,
      commerceId: commerceIdParam,
      id,
    } = req.params;
    const { validity } = req.body;
    const [rowsUpdated] = await Order.update({ validity }, {
      where: { order: orderParam, commerceId: commerceIdParam, id },
    });
    if (rowsUpdated > 0) {
      res.status(200).send(`Modified validity of order: ${orderParam}`);
    } else {
      res.status(404).send('Order not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

order.put('/updatePromotion/:order/:id/:commerceId', async (req, res) => {
  try {
    const {
      order: orderParam,
      commerceId: commerceIdParam,
      id,
    } = req.params;
    const { promotion } = req.body;
    const [rowsUpdated] = await Order.update({ promotion }, {
      where: { order: orderParam, commerceId: commerceIdParam, id },
    });
    if (rowsUpdated > 0) {
      res.status(200).send(`Modified promotion of order: ${orderParam}`);
    } else {
      res.status(404).send('Order not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

order.put('/updateDiscount/:order/:id/:commerceId', async (req, res) => {
  try {
    const {
      order: orderParam,
      commerceId: commerceIdParam,
      id,
    } = req.params;
    const { discount } = req.body;
    const [rowsUpdated] = await Order.update({ discount }, {
      where: { order: orderParam, commerceId: commerceIdParam, id },
    });
    if (rowsUpdated > 0) {
      res.status(200).send(`Modified discount of order: ${orderParam}`);
    } else {
      res.status(404).send('Order not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

order.put('/updateSurcharge/:order/:id/:commerceId', async (req, res) => {
  try {
    const {
      order: orderParam,
      commerceId: commerceIdParam,
      id,
    } = req.params;
    const { surcharge } = req.body;
    const [rowsUpdated] = await Order.update({ surcharge }, {
      where: { order: orderParam, commerceId: commerceIdParam, id },
    });
    if (rowsUpdated > 0) {
      res.status(200).send(`Modified surcharge of order: ${orderParam}`);
    } else {
      res.status(404).send('Order not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

order.put('/rating/:order/:commerceId', async (req, res) => {
  try {
    const { order: orderParam, commerceId: commerceIdParam } = req.params;
    const { rating, feedback } = req.body;
    const [rowsUpdated] = await Order.update({ rating, feedback }, {
      where: { order: orderParam, commerceId: commerceIdParam },
    });
    if (rowsUpdated > 0) {
      res.status(200).send(`Modified feeback of order: ${orderParam}`);
    } else {
      res.status(404).send('Order not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

order.put('/updateMenu/:order/:id/:commerceId', async (req, res) => {
  try {
    const {
      order: orderParam,
      commerceId: commerceIdParam,
      id,
    } = req.params;
    const { menu } = req.body;
    const costMenuAsNumbers = menu.cost.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const promotionMenuAsNumbers = menu.promotion.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const discountMenuAsNumbers = menu.discount.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const surchargeMenuAsNumbers = menu.surcharge.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const menuTypeIdAsNumbers = menu.menuTypeId.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? null : parseValue;
    });
    const categoryAsNumbers = menu.categoryId.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? null : parseValue;
    });
    const amountAsNumbers = menu.amount.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });

    const newMenu = {
      id: menu.id || [],
      name: menu.name || [],
      description: menu.description || [],
      cost: costMenuAsNumbers || [],
      promotion: promotionMenuAsNumbers || [],
      discount: discountMenuAsNumbers || [],
      surcharge: surchargeMenuAsNumbers || [],
      menuTypeId: menuTypeIdAsNumbers || [],
      categoryId: categoryAsNumbers || [],
      dishes: menu.dishes || [],
      product: menu.product || [],
      additional: menu.additional || [],
      amount: amountAsNumbers || [],
      detail: menu.detail || [],
    };

    const [rowsUpdated] = await Order.update({ newMenu }, {
      where: { order: orderParam, commerceId: commerceIdParam, id },
    });
    if (rowsUpdated > 0) {
      res.status(200).send(`Modified menu of order: ${orderParam}`);
    } else {
      res.status(404).send('Order not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

order.put('/updatePos/:order/:id/:commerceId', async (req, res) => {
  try {
    const {
      order: orderParam,
      commerceId: commerceIdParam,
      id,
    } = req.params;
    const { poId } = req.body;
    const [rowsUpdated] = await Order.update({ poId }, {
      where: { order: orderParam, commerceId: commerceIdParam, id },
    });
    if (rowsUpdated > 0) {
      res.status(200).send(`Modified pos of order: ${orderParam}`);
    } else {
      res.status(404).send('Order not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

order.put('/updateEmployee/:order/:id/:commerceId', async (req, res) => {
  try {
    const {
      order: orderParam,
      commerceId: commerceIdParam,
      id,
    } = req.params;
    const { employeeId } = req.body;
    const [rowsUpdated] = await Order.update({ employeeId }, {
      where: { order: orderParam, commerceId: commerceIdParam, id },
    });
    if (rowsUpdated > 0) {
      res.status(200).send(`Modified employee of order: ${orderParam}`);
    } else {
      res.status(404).send('Order not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

order.put('/updateDish/:order/:id/:commerceId', async (req, res) => {
  try {
    const {
      order: orderParam,
      commerceId: commerceIdParam,
      id,
    } = req.params;
    const { dishes } = req.body;
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
    const amountAddInDishesAsNumbers = dishes.amountAdditional.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const amountSuppInDishesAsNumbers = dishes.amountSupplies.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const amountDishesAsNumbers = dishes.amount.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
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
      amountAdditional: amountAddInDishesAsNumbers || [],
      amountSupplies: amountSuppInDishesAsNumbers || [],
      amount: amountDishesAsNumbers || [],
      detail: dishes.detail || [],
    };

    const [rowsUpdated] = await Order.update({ newDishes }, {
      where: { order: orderParam, commerceId: commerceIdParam, id },
    });
    if (rowsUpdated > 0) {
      res.status(200).send(`Modified dish of order: ${orderParam}`);
    } else {
      res.status(404).send('Order not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

order.put('/updateAdditional/:order/:id/:commerceId', async (req, res) => {
  try {
    const {
      order: orderParam,
      commerceId: commerceIdParam,
      id,
    } = req.params;
    const { additionals } = req.body;
    const unitTypeAdditionalAsNumbers = additionals.unitTypeId.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? null : parseValue;
    });
    const costAdditionalAsNumbers = additionals.cost.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const promotionAdditionalAsNumbers = additionals.promotion.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const discountAdditionalAsNumbers = additionals.discount.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const surchargeAdditionalAsNumbers = additionals.surcharge.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const amountAdditionalAsNumbers = additionals.amount.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });

    const newAdditional = {
      id: additionals.id || [],
      name: additionals.name || [],
      amount: amountAdditionalAsNumbers || [],
      cost: costAdditionalAsNumbers || [],
      promotion: promotionAdditionalAsNumbers || [],
      discount: discountAdditionalAsNumbers || [],
      surcharge: surchargeAdditionalAsNumbers || [],
      unitTypeId: unitTypeAdditionalAsNumbers || [],
      detail: additionals.detail || [],
    };

    const [rowsUpdated] = await Order.update({ newAdditional }, {
      where: { order: orderParam, commerceId: commerceIdParam, id },
    });
    if (rowsUpdated > 0) {
      res.status(200).send(`Modified dish of order: ${orderParam}`);
    } else {
      res.status(404).send('Order not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

order.put('/updateProduct/:order/:id/:commerceId', async (req, res) => {
  try {
    const {
      order: orderParam,
      commerceId: commerceIdParam,
      id,
    } = req.params;
    const { products } = req.body;
    const costProductAsNumbers = products.cost.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const unitTypeProductAsNumbers = products.unitTypeId.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? null : parseValue;
    });
    const productTypeAsNumbers = products.productTypeId.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? null : parseValue;
    });
    const supplierIdAsNumbers = products.supplierId.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? null : parseValue;
    });
    const promotionProductAsNumbers = products.promotion.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const discountProductAsNumbers = products.discount.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const surchargeProductAsNumbers = products.surcharge.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });
    const amountProductAsNumbers = products.amount.map((amount) => {
      const parseValue = parseFloat(amount);
      return Number.isNaN(parseValue) ? 0 : parseValue;
    });

    const newProduct = {
      id: products.id || [],
      name: products.name || [],
      cost: costProductAsNumbers || [],
      unitTypeId: unitTypeProductAsNumbers || [],
      productTypeId: productTypeAsNumbers || [],
      supplierId: supplierIdAsNumbers || [],
      promotion: promotionProductAsNumbers || [],
      discount: discountProductAsNumbers || [],
      surcharge: surchargeProductAsNumbers || [],
      amount: amountProductAsNumbers || [],
      allergenType: products.allergenType || [],
      careful: products.careful || [],
      detail: products.detail || [],
    };

    const [rowsUpdated] = await Order.update({ newProduct }, {
      where: { order: orderParam, commerceId: commerceIdParam, id },
    });
    if (rowsUpdated > 0) {
      res.status(200).send(`Modified dish of order: ${orderParam}`);
    } else {
      res.status(404).send('Order not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

order.put('/updateAccount/:order/:id/:commerceId', async (req, res) => {
  try {
    const {
      order: orderParam,
      commerceId: commerceIdParam,
      id,
    } = req.params;
    const { accountId } = req.body;
    const [rowsUpdated] = await Order.update({ accountId }, {
      where: { order: orderParam, commerceId: commerceIdParam, id },
    });
    if (rowsUpdated > 0) {
      res.status(200).send(`Modified account of order: ${orderParam}`);
    } else {
      res.status(404).send('Order not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

order.put('/updatePayment/:order/:id/:commerceId', async (req, res) => {
  try {
    const {
      order: orderParam,
      commerceId: commerceIdParam,
      id,
    } = req.params;
    const { paymentId } = req.body;
    const [rowsUpdated] = await Order.update({ paymentId }, {
      where: { order: orderParam, commerceId: commerceIdParam, id },
    });
    if (rowsUpdated > 0) {
      res.status(200).send(`Modified payment of order: ${orderParam}`);
    } else {
      res.status(404).send('Order not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

order.put('/updateDelivery/:order/:id/:commerceId', async (req, res) => {
  try {
    const {
      order: orderParam,
      commerceId: commerceIdParam,
      id,
    } = req.params;
    const { deliveryId } = req.body;
    const [rowsUpdated] = await Order.update({ deliveryId }, {
      where: { order: orderParam, commerceId: commerceIdParam, id },
    });
    if (rowsUpdated > 0) {
      res.status(200).send(`Modified delivery of order: ${orderParam}`);
    } else {
      res.status(404).send('Order not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

order.put('/updatePaid/:order/:id/:commerceId', async (req, res) => {
  try {
    const {
      order: orderParam,
      commerceId: commerceIdParam,
      id,
    } = req.params;
    const { paid } = req.body;
    const [rowsUpdated] = await Order.update({ paid }, {
      where: { order: orderParam, commerceId: commerceIdParam, id },
    });
    if (rowsUpdated > 0) {
      res.status(200).send(`Modified paid of order: ${orderParam}`);
    } else {
      res.status(404).send('Order not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

order.get('/paidOrderes/:commerceId', async (req, res) => {
  try {
    const { commerceId: commerceIdParam } = req.params;
    const { startDate, endDate } = req.query;
    const ord = await Order.findAll({
      where: {
        date: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
        status: {
          [Op.not]: 'canceled',
        },
        paid: {
          [Op.gt]: 0,
        },
        commerceId: parseInt(commerceIdParam, 10),
      },
      attributes: [
        'id', 'order', 'date', 'hour', 'status', 'detail', 'promotion',
        'discount', 'surcharge', 'costDelivery', 'paid', 'name',
        'additionals', 'products', 'dishes', 'menu', 'googleEmail', 'mpPayment',
      ],
      include: [
        {
          model: Pos,
          attributes: ['id', 'name', 'promotion', 'discount', 'surcharge'],
        },
        {
          model: Employee,
          attributes: ['id', 'firstName', 'lastName', 'photo'],
        },
        {
          model: Delivery,
          attributes: ['id', 'name', 'company', 'logo', 'promotion', 'discount', 'surcharge', 'fee'],
        },
        {
          model: Courier,
          attributes: ['id', 'firstName', 'lastName', 'promotion', 'discount', 'surcharge', 'fee'],
        },
        {
          model: Sector,
          attributes: ['id', 'name', 'promotion', 'discount', 'surcharge'],
        },
        {
          model: Account,
          attributes: ['id', 'name', 'phone', 'email', 'googleUser', 'facebookUser', 'sex'],
        },
      ],
    });
    if (ord) {
      res.status(201).json(ord);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los pagos realizados' });
  }
});

order.get('/orderesDelivery/:commerceId', async (req, res) => {
  try {
    const { commerceId: commerceIdParam } = req.params;
    const { startDate, endDate } = req.query;
    const ord = await Order.findAll({
      where: {
        date: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
        status: {
          [Op.not]: 'canceled',
        },
        paid: {
          [Op.gt]: 0,
        },
        commerceId: parseInt(commerceIdParam, 10),
        deliveryId: {
          [Op.not]: null,
        },
      },
      attributes: [
        'id', 'order', 'date', 'hour', 'status', 'detail', 'promotion',
        'discount', 'surcharge', 'costDelivery', 'paid', 'name',
        'additionals', 'products', 'dishes', 'menu', 'googleEmail', 'mpPayment',
      ],
      include: [
        {
          model: Pos,
          attributes: ['id', 'name', 'promotion', 'discount', 'surcharge'],
        },
        {
          model: Employee,
          attributes: ['id', 'firstName', 'lastName', 'photo'],
        },
        {
          model: Delivery,
          attributes: ['id', 'name', 'company', 'logo', 'promotion', 'discount', 'surcharge', 'fee'],
        },
        {
          model: Courier,
          attributes: ['id', 'firstName', 'lastName', 'promotion', 'discount', 'surcharge', 'fee'],
        },
        {
          model: Sector,
          attributes: ['id', 'name', 'promotion', 'discount', 'surcharge'],
        },
      ],
    });
    if (ord) {
      res.status(201).json(ord);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los pagos realizados' });
  }
});

order.get('/orderesNotDelivery/:commerceId', async (req, res) => {
  try {
    const { commerceId: commerceIdParam } = req.params;
    const { startDate, endDate } = req.query;
    const ord = await Order.findAll({
      where: {
        date: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
        status: {
          [Op.not]: 'canceled',
        },
        paid: {
          [Op.gt]: 0,
        },
        commerceId: parseInt(commerceIdParam, 10),
        deliveryId: null,
      },
      attributes: [
        'id', 'order', 'date', 'hour', 'status', 'detail', 'promotion',
        'discount', 'surcharge', 'costDelivery', 'paid', 'name',
        'additionals', 'products', 'dishes', 'menu', 'googleEmail', 'mpPayment',
      ],
      include: [
        {
          model: Pos,
          attributes: ['id', 'name', 'promotion', 'discount', 'surcharge'],
        },
        {
          model: Employee,
          attributes: ['id', 'firstName', 'lastName', 'photo'],
        },
        {
          model: Delivery,
          attributes: ['id', 'name', 'company', 'logo', 'promotion', 'discount', 'surcharge', 'fee'],
        },
        {
          model: Courier,
          attributes: ['id', 'firstName', 'lastName', 'promotion', 'discount', 'surcharge', 'fee'],
        },
        {
          model: Sector,
          attributes: ['id', 'name', 'promotion', 'discount', 'surcharge'],
        },
      ],
    });
    if (ord) {
      res.status(201).json(ord);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los pagos realizados' });
  }
});

order.put('/updateCourier/:order/:id/:commerceId', async (req, res) => {
  try {
    const {
      order: orderParam,
      commerceId: commerceIdParam,
      id,
    } = req.params;
    const { courierId } = req.body;
    const [rowsUpdated] = await Order.update({ courierId }, {
      where: { order: orderParam, commerceId: commerceIdParam, id },
    });
    if (rowsUpdated > 0) {
      res.status(200).send(`Modified courier of order: ${orderParam}`);
    } else {
      res.status(404).send('Order not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

order.put('/updateCostDelivery/:order/:id/:commerceId', async (req, res) => {
  try {
    const {
      order: orderParam,
      commerceId: commerceIdParam,
      id,
    } = req.params;
    const { costDelivery } = req.body;
    const [rowsUpdated] = await Order.update({ costDelivery }, {
      where: { order: orderParam, commerceId: commerceIdParam, id },
    });
    if (rowsUpdated > 0) {
      res.status(200).send(`Modified cost delivery of order: ${orderParam}`);
    } else {
      res.status(404).send('Order not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

order.get('/vtas/:commerceId', async (req, res) => {
  try {
    const commerceIdParam = req.params.commerceId;
    const { dateFrom, dateTo } = req.query;
    const vtas = await sequelize.query(`SELECT c.date, DAYOFWEEK(c.date) -1 AS num_dia, SUM(c.paid) AS tot_diario, COUNT(c.id) AS pedidos FROM orders c WHERE c.status != "canceled" AND c.commerceId >= ${commerceIdParam} AND c.date >= '${dateFrom}' AND c.date <= '${dateTo}' AND c.paid > 0 GROUP BY c.date ORDER BY c.date ASC;`, { type: QueryTypes.SELECT });
    res.json(vtas);
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

order.get('/warning', async (req, res) => {
  try {
    const orderes = [
      {
        name: 'sss',
        date: '2023-09-19',
        hour: '12:00',
        status: 'orderPlaced',
        detail: 'cambiar la gaseosa por agua sin gas',
        validity: '2023-09-30',
        promotion: 0,
        discount: 0,
        surcharge: 0,
        rating: 5,
        feedback: '',
        menuId: 4,
        poId: 7,
        employeeId: 3,
        paymentId: 6,
        commerceId: 2,
        paid: 2000,
        order: 'C2S1M7 - 1',
        productId: 10,
        sectorId: 1,
        additionalId: 5,
        accountemail: 'luisglogista@gmail.com',
        accountname: 'ernesto machado',
        accountphone: '222222',
        accountbirthDate: '24-10-1967',
        accountaddress: 'Av siempre viva 300',
        googleEmail: '',
      },
    ];
    const to = orderes[0].accountemail || orderes[0].googleEmail;
    const names = orderes[0].accountname || '';
    // eslint-disable-next-line prefer-destructuring
    const newOrder = orderes[0].order;
    // const filePath = path.join(__dirname, '../../controllers/nodemailer/Order/order.html');
    // fs.readFile(filePath, 'utf8', (err, data) => {
    //   if (err) {
    //     // eslint-disable-next-line no-console
    //     console.error('Error al leer el archivo HTML', err);
    //     return;
    //   }
    const laCuenta = '¡La cuenta regresiva ha comenzado!';
    const enUnosMinutos = 'En unos minutos, tendrás tu pedido en las manos.';
    const subject = 'iMenu - Pedido en marcha! 🍔';
    const text = 'Pedido en marcha! 🍔';
    const tuPago = 'Tu pago se ha procesado con éxito.';
    const apreciamos = 'Apreciamos tu confianza en iMenu';
    const necesitasAyuda = '¿Necestas ayuda?';
    // const htmlContent = data.replace('{name}', name)
    //   .replace('{ordeR}', ordeR)
    //   .replace('{lacuenta}', laCuenta)
    //   .replace('{enUnosMinutos}', enUnosMinutos)
    //   .replace('{tuPago}', tuPago);
    // const info = {
    //   from: 'imenunotice@gmail.com',
    //   to,
    //   subject,
    //   text,
    //   html: htmlContent,
    // };
    // sendToEmail(info);
    sendNewOrder(
      to,
      names,
      newOrder,
      laCuenta,
      enUnosMinutos,
      tuPago,
      apreciamos,
      necesitasAyuda,
      subject,
      text,
    );
    // });
    res.status(200).json({ message: `Message sent: ${orderes[0].order}` });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

order.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = order;
