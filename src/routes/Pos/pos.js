const pointOfSale = require("express").Router();
const express = require("express");
const { Pos, PosType } = require("../../db");
const cors = require("cors");

pointOfSale.use(express.json());
pointOfSale.use(cors());
pointOfSale.use(
  express.urlencoded({
    extended: true,
  })
);

pointOfSale.post("/",async(req,res)=>{
  try {
    const {qrCode, posType} =req.body;
    const [posCreated, created] = await Pos.findOrCreate({
      where: {
        qrCode: qrCode.toLowerCase(),
      },
      defaults: {
        qrCode: qrCode.toLowerCase(),
        posTypeId : posType
        ? (
              await PosType.findOne({ where: { type: posType } })
            )?.id
          : null,
      },
    });
    if (created) {
      res.status(200).send("Pos created");
    } else {
      res.status(422).send("Existing Pos ");
    }
  } catch (error) {
    
  }
})

pointOfSale.get("/all", async (req,res)=>{
  try {
    const point = await Pos.findAll({
      attributes: ["id","qrCode","active"],
      include:[
        {
          model: PosType,
          attributes: ["id","type","detail","active"]
        }
      ]
    })

    if (point.length > 0) {
      res.status(201).json(point);
    } else {
      res.status(422).json("Not found");
    }
  } catch (error) {
    res.send(error);
  }
})

pointOfSale.get("/all_active", async (req,res)=>{
  try {
    const point = await Pos.findAll({
      where: { active: true },
      attributes: ["id","qrCode","active"],
       include:[
        {
          model: PosType,
          attributes: ["id","type","detail","active"]
        }
      ]
    })

    if (point.length > 0) {
      res.status(201).json(point);
    } else {
      res.status(422).json("Not found");
    }
  } catch (error) {
    res.send(error);
  }
})

pointOfSale.get("/all_inactive", async (req,res)=>{
  try {
    const point = await Pos.findAll({
      where: { active: false },
      attributes: ["id","qrCode","active"],
       include:[
        {
          model: PosType,
          attributes: ["id","type","detail","active"]
        }
      ]
    })

    if (point.length > 0) {
      res.status(201).json(point);
    } else {
      res.status(422).json("Not found");
    }
  } catch (error) {
    res.send(error);
  }
})

pointOfSale.get("/:id", async (req,res)=>{
  try {
    const id = req.params.id; 
    if (id && Number.isInteger(parseInt(id))){
      const point = await Pos.findAll({
      where: { id: parseInt(id) },
      attributes: ["id","qrCode","active"],
      include:[
        {
          model: PosType,
          attributes: ["id","type","detail","active"]
        }
      ]
    })
      if (point.length > 0) {
        res.status(201).json(point);
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

pointOfSale.put("/update/:id",async (req,res)=>{
  try {
    const id = req.params.id; 
    const { qrCode, posType } = req.body;
     const posFinded = await Pos.findOne({
      where: { id: id },
    });
    if (posFinded) {
      await posFinded.update({
        qrCode : qrCode,
         posTypeId : posType
        ? (
              await PosType.findOne({ where: { type: posType } })
            )?.id
          : null,
      })
      res.status(200).send("The data was modified successfully");
    }else{
       res.status(200).send("ID not found");
    }
     
  } catch (error) {
    res.status(400).send(error);
  }
})

pointOfSale.put("/active/:id", async(req,res)=>{
  try {
    const id = req.params.id; 
    const posFinded = await Pos.findOne({
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

pointOfSale.put("/inactive/:id", async(req,res)=>{
  try {
    const id = req.params.id; 
    const posFinded = await Pos.findOne({
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

module.exports = pointOfSale;