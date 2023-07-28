const employee = require("express").Router();
const express = require("express");
const { Employee, EmployeeType } = require("../../db");
const bcrypt = require("bcrypt");
const cors = require("cors");

employee.use(express.json());
employee.use(cors());
employee.use(
  express.urlencoded({
    extended: true,
  })
);

employee.post("/", async (req, res) => {
  try {
   
    const { firstName, lastName , password , phone, address, birthDate, start, document, email, googleUser, facebookUser, twitterUser, photo, employeeType } = req.body;
    const hash = bcrypt.hashSync(password, 10);
    const [employeeCreated, created] = await Employee.findOrCreate({
      where: {
        email: email.toLowerCase(),
      },
      defaults: {
        firstName: firstName.toLowerCase(),
        lastName: lastName,
        password: hash,
        phone: phone,
        address: address,
        birthDate : birthDate,
        start : start,
        document: document,
        email: email,
        googleUser: googleUser,
        facebookUser: facebookUser,
        twitterUser: twitterUser,
        photo : photo,
        employeeTypeId : employeeType
        ? (
              await EmployeeType.findOne({ where: { type: employeeType } })
            )?.id
          : null,
      },
    });
    if (created) {
      res.status(200).send("Employee created");
    } else {
      res.status(422).send("Existing Employee ");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

employee.get("/all", async (req,res)=>{
  try {
    const employ = await Employee.findAll({
      attributes: ["id","firstName","lastName","phone","address","birthDate","start","document","active","email","googleUser","facebookUser","twitterUser","validatedEmail","photo"],
      include:[
        {
          model: EmployeeType,
          attributes: ["id","type","detail","active"]
        }
      ]
    })

    if (employ.length > 0) {
      res.status(201).json(employ);
    } else {
      res.status(422).json("Not found");
    }
  } catch (error) {
    res.send(error);
  }
})

employee.get("/all_active", async (req,res)=>{
  try {
    const employ = await Employee.findAll({
      where: { active: true },
       attributes: ["id","firstName","lastName","phone","address","birthDate","start","document","active","email","googleUser","facebookUser","twitterUser","validatedEmail","photo"],
      include:[
        {
          model: EmployeeType,
          attributes: ["id","type","detail","active"]
        }
      ]
    })

    if (employ.length > 0) {
      res.status(201).json(employ);
    } else {
      res.status(422).json("Not found");
    }
  } catch (error) {
    res.send(error);
  }
})

employee.get("/:id", async (req,res)=>{
  try {
    const id = req.params.id; 
    if (id && Number.isInteger(parseInt(id))){
      const employ = await Employee.findAll({
      where: { id: parseInt(id) },
       attributes: ["id","firstName","lastName","phone","address","birthDate","start","document","active","email","googleUser","facebookUser","twitterUser","validatedEmail","photo"],
      include:[
        {
          model: EmployeeType,
          attributes: ["id","type","detail","active"]
        }
      ]
    })
      if (employ.length > 0) {
        res.status(201).json(employ);
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

employee.put("/update/:id",async (req,res)=>{
  try {
    const id = req.params.id; 
    const { firstName, lastName , password , phone, address, birthDate, start, document, email, googleUser, facebookUser, twitterUser, photo, employeeType }  = req.body;
    const hash = bcrypt.hashSync(password, 10);
     const employeeFinded = await Employee.findOne({
      where: { id: id },
    });
    if (employeeFinded) {
      await employeeFinded.update({
        firstName: firstName.toLowerCase(),
        lastName: lastName,
        password: hash,
        phone: phone,
        address: address,
        birthDate : birthDate,
        start : start,
        document: document,
        email: email,
        googleUser: googleUser,
        facebookUser: facebookUser,
        twitterUser: twitterUser,
        photo : photo,
        employeeTypeId : employeeType
        ? (
              await EmployeeType.findOne({ where: { type: employeeType } })
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

employee.put("/validated/:id", async(req,res)=>{
  try {
    const id = req.params.id; 
    const employeeFinded = await Employee.findOne({
      where: { id: id },
    });
    if (employeeFinded) {
      await employeeFinded.update({
        validatedEmail : true,
      })
      res.status(200).send("Validated");
    }else{
       res.status(200).send("ID not found");
    }
    

  } catch (error) {
    res.status(400).send(error);
  }
})

employee.put("/unvalidated/:id", async(req,res)=>{
  try {
    const id = req.params.id; 
    const employeeFinded = await Employee.findOne({
      where: { id: id },
    });
    if (employeeFinded) {
      await employeeFinded.update({
        validatedEmail : false,
      })
       res.status(200).send("Unvalidated");
    }else{
       res.status(200).send("ID not found");
    }
    

  } catch (error) {
    res.status(400).send(error);
  }
})

employee.put("/active/:id", async(req,res)=>{
  try {
    const id = req.params.id; 
    const employeeFinded = await Employee.findOne({
      where: { id: id },
    });
    if (employeeFinded) {
      await employeeFinded.update({
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

employee.put("/inactive/:id", async(req,res)=>{
  try {
    const id = req.params.id; 
    const employeeFinded = await Employee.findOne({
      where: { id: id },
    });
    if (employeeFinded) {
      await employeeFinded.update({
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


module.exports = employee;
