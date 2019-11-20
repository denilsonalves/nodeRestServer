require("./config/config");

const express = require("express");
const mongoose = require("mongoose");

const app = express();

const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// configuração das rotas
app.use(require("./routes/index"));

mongoose.connect(
  process.env.URLDB,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  (err, res) => {
    if (err) throw err;
    console.log("Base de dados online");
    console.log(process.env.PORT);
  }
);

app.listen(process.env.PORT);
