const colors = require("colors");

const { Router } = require("express");
const express = require("express");
const modelos = require("../databases/mysql");

const cors = require("cors");
// const { getAllUsers } = require("../controllers/users");

const router = Router();

router.use(cors());
router.use(express.json());

router.get("/test", (req, res) => {
  //*ruta para traer todos los users
  try {
    // const users=  getAllUsers()
    // users ?  res.status(200).send(users): res.status(200).send("No hay información");
  } catch (error) {
    res.status(400).send(error);
  }
});

// router.post()

module.exports = router;
