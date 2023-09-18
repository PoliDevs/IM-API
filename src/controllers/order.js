const { Order } = require('../db');

const getOrders = async (date, pos, commerce, sector) => {
  let newCodigo;
  const orders = await Order.findAll({
    where: {
      date,
      commerceId: commerce,
    },
    attributes: ['id', 'order', 'createdAt'],
    order: [['createdAt', 'DESC']],
  });

  if (orders.length > 0) {
    const regex = /(\d+)$/;
    const firstOrder = orders[0].order;
    const matches = firstOrder.match(regex);
    if (matches && matches.length > 0) {
      const number = parseInt(matches[0], 10) + 1;
      newCodigo = `C${commerce}S${sector}M${pos} - ${number}`;
    }
  } else {
    newCodigo = `C${commerce}S${sector}M${pos} - 1`;
  }
  return newCodigo;
};

module.exports = {
  getOrders,
};
