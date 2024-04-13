const express = require('express');
const router = express.Router();
const form = require('../model/formModel');
const jwt = require('jsonwebtoken')

router.use(express.json());
function verifyToken (req,res,next) {
    const token = req.headers.token;
    try {
        if(!token) throw 'Unauthorized access';
        let payload = jwt.verify(token,'employeeapp')
        if(!payload) throw 'Unauthorized access';
        next()
    } catch (error) {
        res.status(404).send('caught in error')
    }
}

//route for submit form

router.post('/form', verifyToken, async(req,res)=>{
    try {
        let data = req.body;
        let newUser = await form(data).save();
        console.log(newUser);
        res.status(200).send({message:"Data added"})
    } catch (error) {
        console.log(error);
    }
} )

//get data

router.get('/employees', verifyToken,  async (req, res) => {
    try {
        const Employees = await form.find();
        res.status(200).send(Employees);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error fetching posts");
    }
});

//delete data

router.delete('/remove/:id', verifyToken, async (req, res) => {
    try {
        const deletedEmployee = await form.findByIdAndDelete(req.params.id);
        if (!deletedEmployee) {
            return res.status(404).json({ error: "Employee not found" });
        }
        res.json({ message: "Employee data deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});


//update employee

router.put('/employees/:id',verifyToken, async (req, res) => {
    const { id } = req.params;
    const { Name, Designation, Location, Salary } = req.body;
  
    try {
      const updatedEmployee = await form.findByIdAndUpdate(
        id,
        { Name, Designation, Location, Salary },
        { new: true }
      );
  
      if (!updatedEmployee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      res.json({ message: 'Employee updated successfully', form: updatedEmployee });
    } catch (error) {
      console.error('Error updating employee:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


module.exports = router;  