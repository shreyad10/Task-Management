const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const route = require("./app/routes/route.js");
let cors = require("cors");
dotenv.config();

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// Connecting to the database
require("./app/config/connection.js");

app.use(route);
app.use("/", (req, res)=> {
  res.send("Hello world")
})

// listen for requests
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
