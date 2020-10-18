const express = require('express');
const path = require('path');
const fs = require('fs');
const logger = require('morgan');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(logger('dev'));

// routes for css
app.use(express.static('public'))
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
    res.sendFile(path.join(__dirname, './public/notes.html'))
});
// DELETE /api/notes/:id  Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.


app.listen(PORT, function() {
    console.log("App is listening on PORT: " + PORT);
});