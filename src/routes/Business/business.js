const business = require("express").Router();
const express = require("express");
const { Business, BusinessType } = require("../../db");
const cors = require("cors");


business.use(express.json());
business.use(cors());
business.use(
  express.urlencoded({
    extended: true,
  })
);

business.post("/", async (req, res) => {
  try {
    const { name, ssn, detail, email, businessTypeId } = req.body;
    const [businessCreated, created] = await Business.findOrCreate({
      where: {
        name: name.toLowerCase(),
      },
      defaults: {
        name: name.toLowerCase(),
        ssn: ssn,
        detail:detail,
        email: email,
        businessTypeId:businessTypeId
      },
    });
    if (created) {
      res.status(200).send("Business created");
    } else {
      res.status(422).send("Existing Business ");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

business.get("/all", async (req,res)=>{
  try {
    const busi = await Business.findAll({
      attributes: ["id","name","ssn","detail","email","confirmed","active"],
      include:[
        {
          model: BusinessType,
          attributes: ["id","type","detail","active"]
        }
      ]
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

business.get("/all_active", async (req,res)=>{
  try {
    const busi = await Business.findAll({
      where: { active: true },
      attributes: ["id","name","ssn","detail","email","confirmed","active"],
      include:[
        {
          model: BusinessType,
          attributes: ["id","type","detail","active"]
        }
      ]
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

business.get("/:id", async (req,res)=>{
  try {
    const id = req.params.id; 
    if (id && Number.isInteger(parseInt(id))){
      const busi = await Business.findAll({
      where: { id: parseInt(id) },
      attributes: ["id","name","ssn","detail","email","confirmed","active"],
      include:[
        {
          model: BusinessType,
          attributes: ["id","type","detail","active"]
        }
      ]
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

business.put("/update/:id",async (req,res)=>{
  try {
    const id = req.params.id; 
    const { name, ssn, detail, email, businessType } = req.body;
     const businessFinded = await Business.findOne({
      where: { id: id },
    });
    if (businessFinded) {
      await businessFinded.update({
        name : name,
        ssn : ssn,
        detail : detail,
        email : email,
        businessTypeId : businessType
        ? (
              await BusinessType.findOne({ where: { type: businessType } })
            )?.id
          : null,
      })
    }
     res.status(200).send("The data was modified successfully");
  } catch (error) {
    res.status(400).send(error);
  }
})

business.put("/confirmed/:id", async(req,res)=>{
  try {
    const id = req.params.id; 
    const businessFinded = await Business.findOne({
      where: { id: id },
    });
    if (businessFinded) {
      await businessFinded.update({
        confirmed : true,
      })
    }
     res.status(200).send("Confirmed");

  } catch (error) {
    res.status(400).send(error);
  }
})

business.put("/unconfirmed/:id", async(req,res)=>{
  try {
    const id = req.params.id; 
    const businessFinded = await Business.findOne({
      where: { id: id },
    });
    if (businessFinded) {
      await businessFinded.update({
        confirmed : false,
      })
    }
     res.status(200).send("Unconfirmed");

  } catch (error) {
    res.status(400).send(error);
  }
})

business.put("/active/:id", async(req,res)=>{
  try {
    const id = req.params.id; 
    const businessFinded = await Business.findOne({
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

business.put("/inactive/:id", async(req,res)=>{
  try {
    const id = req.params.id; 
    const businessFinded = await Business.findOne({
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

module.exports = business;
