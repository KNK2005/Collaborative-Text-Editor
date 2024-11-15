const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  }
});

mongoose.connect('mongodb+srv://sanidhyakumdev:ZNjpE7OgOuymvJ15@cluster0.fdzcz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

app.use(express.json());
app.use(cors());

// Signup route (no bcrypt for hashing password anymore)
app.post('/api/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const newUser = new User({ username, email, password }); // Store plain text password
        await newUser.save();
        res.status(201).json({ message: "User created" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating user" });
    }
});

// Login route (compare plain text password)
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Compare plain text passwords
        if (user.password !== password) { // Direct comparison
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1h' });
        res.status(200).json({ username: user.username, token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// Socket.IO setup
let documents = {}; // Store documents by ID

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join-document', (docId) => {
    socket.join(docId);
    if (documents[docId]) {
      socket.emit('load-text', documents[docId]);
    } else {
      documents[docId] = ""; // Initialize document if it doesn't exist
    }

    socket.on('text-change', (newText) => {
      documents[docId] = newText;
      socket.to(docId).emit('receive-text', newText);
    });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});