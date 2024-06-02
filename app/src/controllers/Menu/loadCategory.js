const categories = require('express').Router();
const express = require('express');
// const { Op } = require('sequelize');
const cors = require('cors');
const { Category } = require('../../db');

categories.use(express.json());
categories.use(cors());
categories.use(
  express.urlencoded({
    extended: true,
  }),
);

async function findOrCreateCategory(category, commerceId) {
  // eslint-disable-next-line no-unused-vars
  const [categoryCreated, created] = await Category.findOrCreate({
    where: {
      category,
      commerceId,
    },
    defaults: {
      category,
      commerceId,
    },
  });
  return created;
}

const loadCategory = async (menu, commerceId) => {
  let countCreated = 0;
  try {
    // eslint-disable-next-line no-restricted-syntax
    for (const menuItem of menu) {
      const { category } = menuItem;
      // eslint-disable-next-line no-await-in-loop
      const creado = await findOrCreateCategory(category.toLowerCase(), commerceId);
      if (creado) {
        countCreated += 1;
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
  return countCreated;
};

module.exports = {
  loadCategory,
};
