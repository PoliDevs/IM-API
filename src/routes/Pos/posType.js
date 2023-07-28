const posType = require("express").Router();
const express = require("express");
const { PosType } = require("../../db");
const cors = require("cors");

posType.use(express.json());
posType.use(cors());
posType.use(
  express.urlencoded({
    extended: true,
  })
);

posType.post("/",async(req,res)=>{
  try {
    const {type, detail} =req.body;
    const [posTypeCreated, created] = await PosType.findOrCreate({
      where: {
        type: type.toLowerCase(),
      },
      defaults: {
        type: type.toLowerCase(),
        detail:detail,
      },
    });
    if (created) {
      res.status(200).send("PosType created");
    } else {
      res.status(422).send("Existing PosType ");
    }
  } catch (error) {
    
  }
})

posType.get("/all", async (req,res)=>{
  try {
    const poss = await PosType.findAll({
      attributes: ["id","type","detail","active"],
    })

    if (poss.length > 0) {
      res.status(201).json(poss);
    } else {
      res.status(422).json("Not found");
    }
  } catch (error) {
    res.send(error);
  }
})

posType.get("/all_active", async (req,res)=>{
  try {
    const poss = await PosType.findAll({
      where: { active: true },
      attributes: ["id","type","detail","active"],
    })

    if (poss.length > 0) {
      res.status(201).json(poss);
    } else {
      res.status(422).json("Not found");
    }
  } catch (error) {
    res.send(error);
  }
})

posType.get("/:id", async (req,res)=>{
  try {
    const id = req.params.id; 
    if (id && Number.isInteger(parseInt(id))){
      const poss = await PosType.findAll({
      where: { id: parseInt(id) },
      attributes: ["id","type","detail","active"],
    })
      if (poss.length > 0) {
        res.status(201).json(poss);
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

posType.put("/update/:id",async (req,res)=>{
  try {
    const id = req.params.id; 
    const { type, detail } = req.body;
     const posFinded = await PosType.findOne({
      where: { id: id },
    });
    if (posFinded) {
      await posFinded.update({
        type : type,
        detail : detail,
      })
      res.status(200).send("The data was modified successfully");
    }else{
       res.status(200).send("ID not found");
    }
     
  } catch (error) {
    res.status(400).send(error);
  }
})

posType.put("/active/:id", async(req,res)=>{
  try {
    const id = req.params.id; 
    const posFinded = await PosType.findOne({
      where: { id: id },
    });
    if (posFinded) {
      await posFinded.update({
        active : true,
      })
       res.status(200).send("Active");
    }else{
       res.status(200).send("ID not found");
    }
    

  } catch (error) {
    res.status(400).send(error);
  }
})

posType.put("/inactive/:id", async(req,res)=>{
  try {
    const id = req.params.id; 
    const posFinded = await PosType.findOne({
      where: { id: id },
    });
    if (posFinded) {
      await posFinded.update({
        active : false,
      })
      res.status(200).send("Inactive");
    }else{
       res.status(200).send("ID not found");
    }
     

  } catch (error) {
    res.status(400).send(error);
  }
})

module.exports = posType;