// server.ts

import express, { Request, Response } from 'express'
import cors from 'cors'
import bcrypt from "bcrypt";
import connectDB from './config/db'
import LoginData from './models/login_data'
import User from './models/User'
import Lead from './models/Lead'

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Database Connection
connectDB()



// ================= LOGIN =================
app.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid Email",
      });
    }

    if (!password) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }

    res.status(200).json({
      message: "Login Successful",
      data: user,
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });
  }
});



// ================= REGISTER =================
app.post('/register', async (req, res) => {

  try {

    const { name, email, password, role } = req.body

    const newUser = await User.create({
      name,
      email,
      password,
      role,
    })

    console.log(req.body)

    res.status(201).json({
      message: 'sended',
      data: newUser,
    })

  } catch (error) {

    res.status(500).json({
      message: 'Server Error',
    })
  }
})



// ================= CREATE LEAD =================
app.post("/NewLead", async (req, res) => {

  try {

    const {
      name,
      email,
      status,
      source,
      paid
    } = req.body;

    const newLead = await Lead.create({
      name,
      email,
      status,
      source,
      paid,
    })

    console.log(req.body)

    res.status(201).json({
      message: "create successfully",
      data: newLead,
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });
  }
});



// ================= GET ALL LEADS =================
app.get("/leads", async (req, res) => {

  try {

    const leads = await Lead.find();

    res.status(200).json({
      message: "Leads fetched",
      data: leads,
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });
  }
});



// ================= GET SINGLE LEAD =================
app.get("/leads/:id", async (req, res) => {

  try {

    const { id } = req.params;

    const lead = await Lead.findById(id);

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    res.status(200).json(lead);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});



// ================= EDIT LEAD =================
app.put(
  "/EditLead",
  async (req: Request, res: Response) => {

    try {

      const {
        id,
        name,
        email,
        status,
        source,
        paid,
      } = req.body;

      const updatedLead =
        await Lead.findByIdAndUpdate(
          id,
          {
            name,
            email,
            status,
            source,
            paid,
          },
          {
            new: true,
          }
        );

      if (!updatedLead) {
        return res.status(404).json({
          message: "Lead Not Found",
        });
      }

      res.status(200).json({
        message: "Lead Updated Successfully",
        lead: updatedLead,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);
// ================= DELETE LEAD =================
app.delete("/DeleteLead/:id", async (req, res) => {

  try {

    const { id } = req.params;

    const deletedLead = await Lead.findByIdAndDelete(id);

    if (!deletedLead) {
      return res.status(404).json({
        message: "Lead Not Found",
      });
    }

    res.status(200).json({
      message: "Lead Deleted Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});


// ================= SERVER START =================
app.listen(5000, () => {
  console.log('Server running on port 5000')
})