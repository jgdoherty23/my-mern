const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = require("./config/keys").mongoURI; // db config
const items = require("./routes/api/items");


const app = express();

// Body-parser middleware
app.use(bodyParser.json());

// Connect to Mongo
// Promised based, so give callbacks
mongoose.connect(db)
    .then(() => console.log("MongoDB Connected...")) // called on resolved
    .catch(err => console.log(err)); // called on rejected

// Use routes
app.use("/api/items", items);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));