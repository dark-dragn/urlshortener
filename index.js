require('dotenv').config();
console.log(process.env.DB_URL) 
const express = require('express');
const cors = require('cors');
const app = express();
const {MongoClient}=require('mongodb');
// Basic Configuration
const cleint= new MongoClient(process.env.DB_URL);
const db=cleint.db("urlshortener")
const urls=db.collection("url")
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});
app.post('/api/shorturl', function(req, res) {
  console.log(req.body);
  res.json({ greeting: 'hello API' });
});


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
