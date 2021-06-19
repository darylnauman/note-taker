// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Set up the Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

let notes = JSON.parse(fs.readFileSync(path.join(__dirname, '/db/db.json')))

// --- Routes ---

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));
app.get('/api/notes', (req, res) => res.json(notes));

// Receives a new note to save on the request body
// Adds it to the db.json file, and then return the new note to the client
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();

    // console.log(newNote);
    notes.push(newNote);

    // notes.forEach( (element) => console.log(element));
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(notes));
    res.json(notes);
});

app.delete('/api/notes/:id', (req, res) => {
    const noteIdToRemove = req.params.id;
    
    notes = notes.filter( (note) => {
        return note.id !== noteIdToRemove;
    });

    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(notes));
    res.send("Note deleted.");
});

app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

// Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));