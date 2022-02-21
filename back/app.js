const express  = require('express')
const app = express();
var mysql = require('mysql');

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

const path = require('path');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "groupo_db"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
  });

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

module.exports = app;
