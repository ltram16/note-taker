const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes');
const notes = require('./db/db.json');
const uid = require('uid');

const PORT = process.env.PORT || 3001;
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

// app.use('/api/notes', apiRoutes);


// API GET routes
app.get('/', (req,res)=> {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/notes', (req,res)=> {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.get('/api/notes', (req,res)=> {
    res.json(notes)
})

// API POST routes
app.post('/api/notes', (req,res)=> {
    
})

// delete

// spiun up server
app.listen(PORT, ()=> console.log(`Your app is running at http://localhost:${PORT}`));

