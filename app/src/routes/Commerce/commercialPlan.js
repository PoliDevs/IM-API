const commercialPlan = require('express').Router();
const express = require('express');
const cors = require('cors');
const { CommercialPlan } = require('../../db');

commercialPlan.use(express.json());
commercialPlan.use(cors());
commercialPlan.use(
  express.urlencoded({
    extended: true,
  }),
);

commercialPlan.post('/plan', async (req, res) => {
  try {
    const {
      plan,
      validity,
      cost,
      promotion,
      discount,
      scope,
      detail,
      type,
    } = req.body;
    // eslint-disable-next-line no-unused-vars
    const [commercialPlanCreated, created] = await CommercialPlan.findOrCreate({
      where: {
        plan: plan.toLowerCase(),
      },
      defaults: {
        plan: plan.toLowerCase(),
        validity,
        cost,
        promotion,
        discount,
        scope,
        detail,
        type,
      },
    });
    if (created) {
      res.status(200).send('commercialPlan created');
    } else {
      res.status(422).send('Existing commercialPlan ');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

commercialPlan.get('/all', async (req, res) => {
  try {
    const plan = await CommercialPlan.findAll({
      attributes: ['id', 'plan', 'validity', 'cost', 'promotion', 'discount', 'scope', 'updatedAt', 'type', 'detail', 'active'],
    });

    if (plan.length > 0) {
      res.status(201).json(plan);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

commercialPlan.get('/all_active', async (req, res) => {
  try {
    const plan = await CommercialPlan.findAll({
      where: { active: true },
      attributes: ['id', 'plan', 'validity', 'cost', 'promotion', 'discount', 'scope', 'updatedAt', 'type', 'detail', 'active'],
    });

    if (plan.length > 0) {
      res.status(201).json(plan);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

commercialPlan.get('/detail/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id && Number.isInteger(parseInt(id, 10))) {
      const plan = await CommercialPlan.findAll({
        where: { id: parseInt(id, 10) },
        attributes: ['id', 'plan', 'validity', 'cost', 'promotion', 'discount', 'scope', 'updatedAt', 'type', 'detail', 'active'],
      });
      if (plan.length > 0) {
        res.status(201).json(plan);
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

commercialPlan.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      plan,
      validity,
      cost,
      promotion,
      discount,
      scope,
      detail,
      type,
    } = req.body;
    const commerceFinded = await CommercialPlan.findOne({
      where: { id },
    });
    if (commerceFinded) {
      await commerceFinded.update({
        plan: plan.toLowerCase(),
        validity,
        cost,
        promotion,
        discount,
        scope,
        detail,
        type,
      });
      res.status(200).send('The data was modified successfully');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

commercialPlan.put('/active/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const commerceFinded = await CommercialPlan.findOne({
      where: { id },
    });
    if (commerceFinded) {
      await commerceFinded.update({
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

commercialPlan.put('/inactive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const commerceFinded = await CommercialPlan.findOne({
      where: { id },
    });
    if (commerceFinded) {
      await commerceFinded.update({
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

commercialPlan.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = commercialPlan;
