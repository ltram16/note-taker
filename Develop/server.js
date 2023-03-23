// Getting express server
const express = require('express');
const path = require('path');
let notes = require('./db/db.json');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 3001;
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));


// API GET routes
app.get('/', (req,res)=> {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/notes', (req,res)=> {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.get('/api/notes', (req,res)=> {
    const savedNote = JSON.parse(fs.readFileSync(path.join(__dirname, './db/db.json'), "utf-8"))

    res.json(savedNote)
})

// API POST routes
app.post('/api/notes', (req,res)=> {
    console.log("req.body! ", req.body)
    const savedNote = JSON.parse(fs.readFileSync(path.join(__dirname, './db/db.json'), "utf-8"))
    let newNotes = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text
    }

    savedNote.push(newNotes);
    fs.writeFileSync("./db/db.json", JSON.stringify(savedNote))

    res.json(newNotes)
    
})

// delete
app.delete('/api/notes/:id', (req,res)=> {
    const savedNote = JSON.parse(fs.readFileSync(path.join(__dirname, './db/db.json'), "utf-8"))
    const filterNotes = savedNote.filter(note=>note.id!==req.params.id)
    fs.writeFileSync("./db/db.json", JSON.stringify(filterNotes))
    res.json(filterNotes)
})


// spiun up server
app.listen(PORT, ()=> console.log(`Your app is running at http://localhost:${PORT}`));

