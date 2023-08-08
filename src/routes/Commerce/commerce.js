const commerces = require('express').Router();
const express = require('express');
const cors = require('cors');
const {
  Commerce, CommerceFact, Franchise, FranchiseType, Bank,
} = require('../../db');

commerces.use(express.json());
commerces.use(cors());
commerces.use(
  express.urlencoded({
    extended: true,
  }),
);

commerces.post('/', async (req, res) => {
  try {
    const {
      name, neighborhood, address, workSchedule, email, phono, franchiseName, commerceFact, account,
    } = req.body;
    // eslint-disable-next-line no-unused-vars
    const [commerceCreated, created] = await Commerce.findOrCreate({
      where: {
        name: name.toLowerCase(),
      },
      defaults: {
        name: name.toLowerCase(),
        neighborhood,
        address,
        workSchedule,
        email,
        phono,
        franchiseId: franchiseName
          ? (
            await Franchise.findOne({ where: { name: franchiseName } })
          )?.id
          : null,
        commerceFactId: commerceFact
          ? (
            await CommerceFact.findOne({ where: { type: commerceFact } })
          )?.id
          : null,
        bankId: account
          ? (
            await Bank.findOne({ where: { account } })
          )?.id
          : null,
      },
    });
    if (created) {
      res.status(200).send('Commerce created');
    } else {
      res.status(422).send('Existing Commerce ');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

commerces.get('/all', async (req, res) => {
  try {
    const comm = await Commerce.findAll({
      attributes: ['id', 'name', 'neighborhood', 'address', 'workSchedule', 'email', 'phono', 'active'],
      include: [
        {
          model: CommerceFact,
          attributes: ['id', 'type', 'detail', 'active'],
        },
        {
          model: Franchise,
          attributes: ['id', 'name', 'detail', 'email', 'active'],
          include: [
            {
              model: FranchiseType,
              attributes: ['id', 'type', 'detail'],
            },
          ],
        },
        {
          model: Bank,
          attributes: ['id', 'account', 'number', 'detail', 'active'],
        },
      ],
    });

    if (comm.length > 0) {
      res.status(201).json(comm);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.send(error);
  }
});

commerces.get('/all_active', async (req, res) => {
  try {
    const comm = await Commerce.findAll({
      where: { active: true },
      attributes: ['id', 'name', 'neighborhood', 'address', 'workSchedule', 'email', 'phono', 'active'],
      include: [
        {
          model: CommerceFact,
          attributes: ['id', 'type', 'detail', 'active'],
        },
        {
          model: Franchise,
          attributes: ['id', 'name', 'detail', 'email', 'active'],
          include: [
            {
              model: FranchiseType,
              attributes: ['id', 'type', 'detail'],
            },
          ],
        },
        {
          model: Bank,
          attributes: ['id', 'account', 'number', 'detail', 'active'],
        },
      ],
    });

    if (comm.length > 0) {
      res.status(201).json(comm);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.send(error);
  }
});

commerces.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id && Number.isInteger(parseInt(id, 10))) {
      const comm = await Commerce.findAll({
        where: { id: parseInt(id, 10) },
        attributes: ['id', 'name', 'neighborhood', 'address', 'workSchedule', 'email', 'phono', 'active'],
        include: [
          {
            model: CommerceFact,
            attributes: ['id', 'type', 'detail', 'active'],
          },
          {
            model: Franchise,
            attributes: ['id', 'name', 'detail', 'email', 'active'],
            include: [
              {
                model: FranchiseType,
                attributes: ['id', 'type', 'detail'],
              },
            ],
          },
          {
            model: Bank,
            attributes: ['id', 'account', 'number', 'detail', 'active'],
          },
        ],
      });
      if (comm.length > 0) {
        res.status(201).json(comm);
      } else {
        res.status(422).json('Not found');
      }
    } else {
      res.status(422).send('ID was not provided');
    }
  } catch (error) {
    res.send(error);
  }
});

commerces.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name, neighborhood, address, workSchedule, email, phono, franchiseName, commerceFact, account,
    } = req.body;
    const commerceFinded = await Commerce.findOne({
      where: { id },
    });
    if (commerceFinded) {
      await commerceFinded.update({
        name: name.toLowerCase(),
        neighborhood,
        address,
        workSchedule,
        email,
        phono,
        franchiseId: franchiseName
          ? (
            await Franchise.findOne({ where: { name: franchiseName } })
          )?.id
          : null,
        commerceFactId: commerceFact
          ? (
            await CommerceFact.findOne({ where: { type: commerceFact } })
          )?.id
          : null,
        bankId: account
          ? (
            await Bank.findOne({ where: { account } })
          )?.id
          : null,
      });
      res.status(200).send('The data was modified successfully');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

commerces.put('/active/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const commerceFinded = await Commerce.findOne({
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

commerces.put('/inactive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const commerceFinded = await Commerce.findOne({
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

commerces.put('/bnk/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { account } = req.body;
    const commerceFinded = await Commerce.findOne({
      where: { id },
    });
    if (commerceFinded) {
      await commerceFinded.update({
        bankId: account
          ? (
            await Bank.findOne({ where: { account } })
          )?.id
          : null,
      });
      res.status(200).send('The data was modified successfully');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = commerces;
