require('dotenv').config();
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

// MongoDB Connection
mongoose.connect(process.env.MONGO_DB_LINK, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model('User', userSchema);

// Document Schema
const documentSchema = new mongoose.Schema({
  docId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  content: { type: String, required: true },
  lastModified: { type: Date, default: Date.now },
});
const Document = mongoose.model('Document', documentSchema);

app.use(express.json());
app.use(cors());

// Signup Route
app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: "User created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating user" });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1h' });
    res.status(200).json({ username: user.username, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// User Profile Route
app.get('/api/user-profile', async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, 'secret');
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ username: user.username, email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Fetch Document by docId
app.get('/api/document/:docId', async (req, res) => {
  const { docId } = req.params;

  try {
    const document = await Document.findOne({ docId });

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.status(200).json({ content: document.content });
  } catch (err) {
    console.error('Error fetching document:', err);
    res.status(500).json({ message: 'Server error while fetching document' });
  }
});

// Fetch User-Specific Documents Route
app.get('/api/user-documents', async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    // Decode the token to get the user ID
    const decoded = jwt.verify(token, 'secret');

    // Find the user by their ID to get the username
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Find documents by username and include their content
    const documents = await Document.find({ username: user.username }).select('docId content'); // Select docId and content fields

    res.status(200).json({ documents });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch user-specific documents." });
  }
});

// Save Document Route
app.post('/api/save-document', async (req, res) => {
  const { docId, username, content } = req.body;

  console.log('Received save request:', { docId, username, content });  // Log the received data

  if (!docId || !username || !content) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const existingDoc = await Document.findOne({ docId });

    if (existingDoc) {
      existingDoc.content = content;
      existingDoc.lastModified = Date.now();
      await existingDoc.save();
      console.log('Document updated successfully');
      return res.status(200).json({ message: "Document updated successfully" });
    }

    const newDoc = new Document({ docId, username, content });
    await newDoc.save();
    console.log('New document saved successfully');
    res.status(201).json({ message: "Document saved successfully" });
  } catch (err) {
    console.error('Error saving document:', err);  // Log any error that occurs
    res.status(500).json({ message: "Error saving document" });
  }
});

// Socket.IO Setup
let documents = {}; // Store documents by ID

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join-document', (docId) => {
    socket.join(docId);
    if (!documents[docId]) {
      documents[docId] = { content: "", style: {} }; // Initialize document if it doesn't exist
    }

    // Send initial content to the user
    socket.emit('load-text', documents[docId].content);

    // Listen for text changes
    socket.on('text-change', (newText) => {
      documents[docId].content = newText;
      socket.to(docId).emit('receive-text', newText);
    });

    // Listen for style changes
    socket.on('style-change', (updatedStyle) => {
      documents[docId].style = updatedStyle;
      socket.to(docId).emit('receive-style', updatedStyle);
    });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Server Setup
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
