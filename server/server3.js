const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
const uri =
  "mongodb+srv://tadele:029mertu@tadedb.uq89r.mongodb.net/tadeDb?retryWrites=true&w=majority";
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Schema and Model
const MessageSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  cgpa: { type: Number, required: true },
});

const Todo = mongoose.model("Todo", MessageSchema);

// Routes

// Create a new record
app.post("/about", async (req, res) => {
  try {
    const { name, age, cgpa } = req.body;

    // Generate a unique ID for the record
    const count = await Todo.countDocuments();
    const newMessage = new Todo({ id: count + 1, name, age, cgpa });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    console.error("Error saving record:", err);
    res.status(400).json({ error: "Invalid data" });
  }
});

// Fetch all records
app.get("/about", async (req, res) => {
  try {
    const messages = await Todo.find();
    res.json(messages);
  } catch (err) {
    console.error("Error fetching records:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Fetch a specific record by ID
app.get("/about/:id", async (req, res) => {
  try {
    const message = await Todo.findOne({ id: req.params.id });
    if (!message) return res.status(404).json({ error: "Record not found" });
    res.json(message);
  } catch (err) {
    console.error("Error fetching record by ID:", err);
    res.status(400).json({ error: "Invalid ID" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));