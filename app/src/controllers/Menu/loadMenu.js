const menu = require('express').Router();
const express = require('express');
const cors = require('cors');
const {
  Menu, MenuType, Category,
} = require('../../db');

menu.use(express.json());
menu.use(cors());
menu.use(
  express.urlencoded({
    extended: true,
  }),
);

const loadMenu = async (menus, commerceId) => {
  let countCreated = 0;
  try {
    let menuTypeId = 0;
    let categoryId = 0;
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
    const dia = fechaActual.getDate().toString().padStart(2, '0');
    const fechaCorta = `${año}-${mes}-${dia}`;

    await Menu.update({ status: 'old' }, {
      where: {
        status: 'last',
        commerceId,
      },
    });

    await Promise.all(menus.map(async (element) => {
      const type = element.menuType;
      const menuFinded = await MenuType.findOne({
        where: {
          type,
          commerceId,
        },
      });
      if (menuFinded) {
        menuTypeId = menuFinded.id;
      }
      // eslint-disable-next-line prefer-destructuring
      const category = element.category;
      const categoryFinded = await Category.findOne({
        where: {
          category,
          commerceId,
        },
      });
      if (categoryFinded) {
        categoryId = categoryFinded.id;
      }

      // eslint-disable-next-line no-unused-vars
      const [menuCreated, created] = await Menu.findOrCreate({
        where: {
          name: element.name.toLowerCase(),
          commerceId,
          status: 'last',
        },
        defaults: {
          name: element.name,
          date: fechaCorta,
          description: element.description,
          cost: element.cost,
          promotion: element.promotion,
          discount: element.discount,
          surcharge: element.surcharge,
          validity: element.validity,
          photo: element.photo,
          commerceId,
          menuTypeId,
          categoryId,
          dishes: element.dishes,
          product: element.product,
          additional: element.additional,
        },
      });
      if (created) {
        countCreated = +1;
      }
    }));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
  return countCreated;
};

module.exports = {
  loadMenu,
};
