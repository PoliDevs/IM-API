const menuType = require('express').Router();
const express = require('express');
const cors = require('cors');
const { MenuType } = require('../../db');

menuType.use(express.json());
menuType.use(cors());
menuType.use(
  express.urlencoded({
    extended: true,
  }),
);

const loadMenuType = async (menu, commerceId) => {
  let countCreated = 0;
  try {
    await Promise.all(menu.map(async (element) => {
      const type = element.menuType;
      const [, created] = await MenuType.findOrCreate({
        where: {
          type: type.toLowerCase(),
          commerceId,
        },
        defaults: {
          type: type.toLowerCase(),
          commerceId,
        },
      });
      if (created) {
        countCreated += 1;
      }
    }));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
  return countCreated;
};

module.exports = {
  loadMenuType,
};
