const categories = require('express').Router();
const express = require('express');
const cors = require('cors');
const { Category } = require('../../db');

categories.use(express.json());
categories.use(cors());
categories.use(
  express.urlencoded({
    extended: true,
  }),
);

const loadCategory = async (menu, commerceId) => {
  let countCreated = 0;
  try {
    await Promise.all(menu.map(async (element) => {
      // eslint-disable-next-line prefer-destructuring
      const category = element.category;
      // eslint-disable-next-line no-unused-vars
      const [categoryCreated, created] = await Category.findOrCreate({
        where: {
          category: category.toLowerCase(),
          commerceId,
        },
        defaults: {
          category: category.toLowerCase(),
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
  loadCategory,
};
