const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = "mongodb+srv://tadele:029mertu@tadedb.uq89r.mongodb.net/?retryWrites=true&w=majority&appName=tadeDb";
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Schema and Model
const MessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  cgpa: { type: Number, required: true },
});

const Todo = mongoose.model("todo", MessageSchema);

// Routes
app.post("/about", async (req, res) => {
  try {
    const { name, age, cgpa } = req.body;
    const newMessage = new Todo({ name, age, cgpa });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(400).json({ error: "Invalid data" });
  }
});

app.get("/about", async (req, res) => {
  const messages = await Todo.find();
  res.json(messages);
});

app.get("/about/:id", async (req, res) => {
  try {
    const message = await Todo.findById(req.params.id);
    if (!message) return res.status(404).json({ error: "Record not found" });
    res.json(message);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));