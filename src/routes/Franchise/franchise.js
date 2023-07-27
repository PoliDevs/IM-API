const franchise = require("express").Router();
const express = require("express");
const { Franchise, FranchiseType } = require("../../db");
const cors = require("cors");


franchise.use(express.json());
franchise.use(cors());
franchise.use(
  express.urlencoded({
    extended: true,
  })
);

franchise.post("/", async (req, res) => {
  try {
    const { name, ssn, detail, email, franchiseTypeId } = req.body;
    const [franchiseCreated, created] = await Franchise.findOrCreate({
      where: {
        name: name.toLowerCase(),
      },
      defaults: {
        name: name.toLowerCase(),
        ssn: ssn,
        detail:detail,
        email: email,
        franchiseTypeId:franchiseTypeId
      },
    });
    if (created) {
      res.status(200).send("Franchise created");
    } else {
      res.status(422).send("Existing Franchise ");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

franchise.get("/all", async (req,res)=>{
  try {
    const busi = await Franchise.findAll({
      attributes: ["id","name","ssn","detail","email","confirmed","active"],
      include:[
        {
          model: FranchiseType,
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

franchise.get("/all_active", async (req,res)=>{
  try {
    const busi = await Franchise.findAll({
      where: { active: true },
      attributes: ["id","name","ssn","detail","email","confirmed","active"],
      include:[
        {
          model: FranchiseType,
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

franchise.get("/:id", async (req,res)=>{
  try {
    const id = req.params.id; 
    if (id && Number.isInteger(parseInt(id))){
      const busi = await Franchise.findAll({
      where: { id: parseInt(id) },
      attributes: ["id","name","ssn","detail","email","confirmed","active"],
      include:[
        {
          model: FranchiseType,
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

franchise.put("/update/:id",async (req,res)=>{
  try {
    const id = req.params.id; 
    const { name, ssn, detail, email, franchiseType } = req.body;
     const franchiseFinded = await Franchise.findOne({
      where: { id: id },
    });
    if (franchiseFinded) {
      await franchiseFinded.update({
        name : name,
        ssn : ssn,
        detail : detail,
        email : email,
        franchiseTypeId : franchiseType
        ? (
              await FranchiseType.findOne({ where: { type: franchiseType } })
            )?.id
          : null,
      })
    }
     res.status(200).send("The data was modified successfully");
  } catch (error) {
    res.status(400).send(error);
  }
})

franchise.put("/confirmed/:id", async(req,res)=>{
  try {
    const id = req.params.id; 
    const franchiseFinded = await Franchise.findOne({
      where: { id: id },
    });
    if (franchiseFinded) {
      await franchiseFinded.update({
        confirmed : true,
      })
    }
     res.status(200).send("Confirmed");

  } catch (error) {
    res.status(400).send(error);
  }
})

franchise.put("/unconfirmed/:id", async(req,res)=>{
  try {
    const id = req.params.id; 
    const franchiseFinded = await Franchise.findOne({
      where: { id: id },
    });
    if (franchiseFinded) {
      await franchiseFinded.update({
        confirmed : false,
      })
    }
     res.status(200).send("Unconfirmed");

  } catch (error) {
    res.status(400).send(error);
  }
})

franchise.put("/active/:id", async(req,res)=>{
  try {
    const id = req.params.id; 
    const franchiseFinded = await Franchise.findOne({
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

franchise.put("/inactive/:id", async(req,res)=>{
  try {
    const id = req.params.id; 
    const franchiseFinded = await Franchise.findOne({
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


module.exports = franchise;