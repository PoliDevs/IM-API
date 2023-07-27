const franchiseType = require("express").Router();
const express = require("express");
const { FranchiseType } = require("../../db");

const cors = require("cors");

franchiseType.use(express.json());
franchiseType.use(cors());
franchiseType.use(
  express.urlencoded({
    extended: true,
  })
);

franchiseType.post("/",async(req,res)=>{
  try {
    const {type, detail} =req.body;
    const [franchiseTypeCreated, created] = await FranchiseType.findOrCreate({
      where: {
        type: type.toLowerCase(),
      },
      defaults: {
        type: type.toLowerCase(),
        detail:detail,
      },
    });
    if (created) {
      res.status(200).send("FranchiseType created");
    } else {
      res.status(422).send("Existing FranchiseType ");
    }
  } catch (error) {
    
  }
})

franchiseType.get("/all", async (req,res)=>{
  try {
    const franchi = await FranchiseType.findAll({
      attributes: ["id","type","detail","active"],
    })

    if (franchi.length > 0) {
      res.status(201).json(franchi);
    } else {
      res.status(422).json("Not found");
    }
  } catch (error) {
    res.send(error);
  }
})

franchiseType.get("/all_active", async (req,res)=>{
  try {
    const franchi = await FranchiseType.findAll({
      where: { active: true },
      attributes: ["id","type","detail","active"],
    })

    if (franchi.length > 0) {
      res.status(201).json(franchi);
    } else {
      res.status(422).json("Not found");
    }
  } catch (error) {
    res.send(error);
  }
})

franchiseType.get("/:id", async (req,res)=>{
  try {
    const id = req.params.id; 
    if (id && Number.isInteger(parseInt(id))){
      const franchi = await FranchiseType.findAll({
      where: { id: parseInt(id) },
      attributes: ["id","type","detail","active"],
    })
      if (franchi.length > 0) {
        res.status(201).json(franchi);
      } else {
        res.status(422).json("Not found");
      }
    } else {
      res.status(422).send("ID was not provided");
    }

  } catch (error) {
    res.send(error);
  }
})

franchiseType.put("/update/:id",async (req,res)=>{
  try {
    const id = req.params.id; 
    const { type, detail } = req.body;
     const franchiseFinded = await FranchiseType.findOne({
      where: { id: id },
    });
    if (franchiseFinded) {
      await franchiseFinded.update({
        type : type,
        detail : detail,
      })
    }
     res.status(200).send("The data was modified successfully");
  } catch (error) {
    res.status(400).send(error);
  }
})

franchiseType.put("/active/:id", async(req,res)=>{
  try {
    const id = req.params.id; 
    const franchiseFinded = await FranchiseType.findOne({
      where: { id: id },
    });
    if (franchiseFinded) {
      await franchiseFinded.update({
        active : true,
      })
    }
     res.status(200).send("Active");

  } catch (error) {
    res.status(400).send(error);
  }
})

franchiseType.put("/inactive/:id", async(req,res)=>{
  try {
    const id = req.params.id; 
    const franchiseFinded = await FranchiseType.findOne({
      where: { id: id },
    });
    if (franchiseFinded) {
      await franchiseFinded.update({
        active : false,
      })
    }
     res.status(200).send("Inactive");

  } catch (error) {
    res.status(400).send(error);
  }
})

module.exports = franchiseType;
