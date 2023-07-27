const businessType = require("express").Router();
const express = require("express");
const { BusinessType } = require("../../db");
const cors = require("cors");

businessType.use(express.json());
businessType.use(cors());
businessType.use(
  express.urlencoded({
    extended: true,
  })
);

businessType.post("/",async(req,res)=>{
  try {
    const {type, detail} =req.body;
    const [businessTypeCreated, created] = await BusinessType.findOrCreate({
      where: {
        type: type.toLowerCase(),
      },
      defaults: {
        type: type.toLowerCase(),
        detail:detail,
      },
    });
    if (created) {
      res.status(200).send("BusinessType created");
    } else {
      res.status(422).send("Existing BusinessType ");
    }
  } catch (error) {
    
  }
})

businessType.get("/all", async (req,res)=>{
  try {
    const busi = await BusinessType.findAll({
      attributes: ["id","type","detail","active"],
    })

    if (busi.length > 0) {
      res.status(201).json(busi);
    } else {
      res.status(422).json("Not found");
    }
  } catch (error) {
    res.send(error);
  }
})

businessType.get("/all_active", async (req,res)=>{
  try {
    const busi = await BusinessType.findAll({
      where: { active: true },
      attributes: ["id","type","detail","active"],
    })

    if (busi.length > 0) {
      res.status(201).json(busi);
    } else {
      res.status(422).json("Not found");
    }
  } catch (error) {
    res.send(error);
  }
})

businessType.get("/:id", async (req,res)=>{
  try {
    const id = req.params.id; 
    if (id && Number.isInteger(parseInt(id))){
      const busi = await BusinessType.findAll({
      where: { id: parseInt(id) },
      attributes: ["id","type","detail","active"],
    })
      if (busi.length > 0) {
        res.status(201).json(busi);
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

businessType.put("/update/:id",async (req,res)=>{
  try {
    const id = req.params.id; 
    const { type, detail } = req.body;
     const businessFinded = await BusinessType.findOne({
      where: { id: id },
    });
    if (businessFinded) {
      await businessFinded.update({
        type : type,
        detail : detail,
      })
    }
     res.status(200).send("The data was modified successfully");
  } catch (error) {
    res.status(400).send(error);
  }
})

businessType.put("/active/:id", async(req,res)=>{
  try {
    const id = req.params.id; 
    const businessFinded = await BusinessType.findOne({
      where: { id: id },
    });
    if (businessFinded) {
      await businessFinded.update({
        active : true,
      })
    }
     res.status(200).send("Active");

  } catch (error) {
    res.status(400).send(error);
  }
})

businessType.put("/inactive/:id", async(req,res)=>{
  try {
    const id = req.params.id; 
    const businessFinded = await BusinessType.findOne({
      where: { id: id },
    });
    if (businessFinded) {
      await businessFinded.update({
        active : false,
      })
    }
     res.status(200).send("Inactive");

  } catch (error) {
    res.status(400).send(error);
  }
})

module.exports = businessType;
