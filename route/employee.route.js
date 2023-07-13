const express = require('express')
const { empModel } = require("../model/employee.model.js")
const empRouter = express.Router()


empRouter.get("/getData",async(req,res)=>{

    try {
        const user= await empModel.find();
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({"msg":error.message});
    }
    
})


empRouter.post("/employees",async(req,res)=>{
    const payload=req.body;
    try {
        const employee= new empModel(payload);
        await employee.save()
        res.send({"msg":"Employee added"})
    } catch (err) {
        res.send(err.message)
    }
})

empRouter.delete("/delete/:id",async(req,res)=>{
    const id= req.params.id;
    try {
        await empModel.findByIdAndDelete({_id:id})
        res.send({"msg":"employee data deleted"})
    } catch (error) {
        res.send({"err":error.message})
    }
});

empRouter.patch("/edit/:id",async(req,res)=>{
    const id=req.params.id
    const data=req.body
    try{
        await empModel.findByIdAndUpdate({_id:id},data)
        res.status(200).send({"msg":`employee has been Updated`})
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

empRouter.get("/filter", async (req, res) => {

    try {

      const { department } = req.query;
      const employees = await empModel.find({ Department: department });
      if(employees.length>0){
          res.status(200).send(employees);
      }else{
        res.status(200).send({"msg":"No data found"})
      }


    } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
  });


  empRouter.get("/sort", async (req, res) => {
    try {
      const { sortBy } = req.query;
  
      // Query the database and apply sorting by salary
      const employees = await empModel.find().sort({ Salary: sortBy });
  
      res.send(employees);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

module.exports = {
    empRouter
}
