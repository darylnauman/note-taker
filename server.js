// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');

// Set up the Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// --- Routes ---

// HTML Routes
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

// API Routes

// Read the db.json file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => {
    
    fs.readFile(`${__dirname}/db/db.json`, 'utf8', (err, data) => {
        if (err) throw err;
        let notes = JSON.parse(data);
        res.json(notes);
    })

});

// - POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();
    
    console.log(newNote);
    notes.push(newNote);
    res.json(newNote);
});

// Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));