const { Order, Commerce } = require('../db');

const getOrders = async (date, pos, commerce) => {
  let newCodigo;
  const orders = await Order.findAll({
    where: {
      date,
    },
    attributes: ['id', 'order', 'createdAt'],
    include: [
      {
        model: Commerce,
        attributes: ['id'],
      },
    ],
    order: [['createdAt', 'DESC']],
  });

  if (orders.length > 0) {
    const regex = /(\d+)$/;
    const firstOrder = orders[0].order;
    const matches = firstOrder.match(regex);
    if (matches && matches.length > 0) {
      const number = parseInt(matches[0], 10) + 1;
      const commerceId = orders[0].dataValues.id;
      newCodigo = `C${commerceId}M${pos} - ${number}`;
    }
  } else {
    newCodigo = `C${commerce}M${pos} - 1`;
  }
  return newCodigo;
};

module.exports = {
  getOrders,
};
