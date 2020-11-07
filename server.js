const express = require('express');
const path = require('path');
const fs = require('fs');
let db = require("./db/db.json");
// shows error from front end in the terminal
// const logger = require('morgan');
// const { networkInterfaces } = require('os');
// app.use(logger('dev'));

const app = express();
const PORT = process.env.PORT || 8080;

let noteData = [];

// function to read notes
fs.readFile("db/db.json", "utf8", (err, data) => {
    noteData = JSON.parse(data);
    nextId = Math.max(...noteData.map(function (note) {
        return note.id
    })) + 1;
});

// routes for css
app.use(express.static('public'))

app.use(express.json());
app.use(express.urlencoded({ extend: true }))
// need to make HTML routes


// GET /api/notes Should read the `db.json` file and return all saved notes as JSON.
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

// POST /api/notes Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

app.get('/api/notes', function (req, res) {
    res.json(noteData)
});

// function to save notes
app.post('/api/notes', function (req, res) {
    let newNote = req.body;
    newNote.id = Date.now();
    noteData.push(newNote);

    newNote = JSON.stringify(noteData);
    fs.writeFile("db/db.json", newNote, (err) => {
        console.log(err);
        res.json(newNote)
    });

});

// DELETE /api/notes/:id  Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
// function to delete notes
app.delete('/api/notes/:id', function (req, res, next) {
    let id = req.params.id
    // let trash = [];
    noteData.forEach(note => {
        if (note.id == id) {
            noteData = noteData.filter((note => note.id !== parseInt(req.params.id)));
            console.log(noteData);
            // trash.push(id);
            // console.log(trash)
        }
    })

    newNote = JSON.stringify(noteData);
    fs.writeFile("db/db.json", newNote, (err) => {
        res.json({ ok: true })
    });

});

app.listen(PORT, function () {
    console.log("App is listening on PORT: " + PORT);
});