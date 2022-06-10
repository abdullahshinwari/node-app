const express = require("express");
const cors = require("cors");
const bodyparser = require('body-parser');

const app = express();

require('dotenv').config()

app.use(bodyparser.json());

var corsOptions = {
  origin: "http://localhost:8081"
};

// routers
const router = require('./routes/userRouter.js')
app.use ('/users', router)

// middleware
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route or testing api
app.get("/", (req, res) => {
  res.json({ message: "Welcome to abdullah node application." });
});

app.get('*', function(req, res){
  res.send('Route does not exist', 404);
});

const PORT = process.env.PORT || 8080;

// run server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});