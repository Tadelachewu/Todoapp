const express = require('express');
const app = express();
const PORT = 4000;

app.use(express.json());

// In-memory database
let users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" }
];

// GET: Retrieve all users
app.get('/users', (req, res) => {
    res.json(users);
});

// POST: Add a new user
app.post('/users', (req, res) => {
    const newUser = req.body;
    newUser.id = users.length + 1;
    users.push(newUser);
    res.status(201).json({ message: "User added successfully!", user: newUser });
});

// PUT: Replace a user by ID
app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const updatedUser = req.body;

    const userIndex = users.findIndex((u) => u.id === userId);
    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found!" });
    }

    updatedUser.id = userId; // Keep the same ID
    users[userIndex] = updatedUser;
    res.json({ message: "User updated successfully!", user: updatedUser });
});

// PATCH: Partially update a user by ID
app.patch('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const updates = req.body;

    const user = users.find((u) => u.id === userId);
    if (!user) {
        return res.status(404).json({ message: "User not found!" });
    }

    Object.assign(user, updates);
    res.json({ message: "User updated successfully!", user });
});

// DELETE: Remove a user by ID
app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);

    const userIndex = users.findIndex((u) => u.id === userId);
    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found!" });
    }

    users.splice(userIndex, 1);
    res.json({ message: "User deleted successfully!" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`API running at http://localhost:${PORT}`);
});