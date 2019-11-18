require("./config/config");

const express = require("express");
const app = express();

const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/usuario", function(req, res) {
  res.send("get Usuario");
});

app.post("/usuario", function(req, res) {
  let body = req.body;

  if (body.nome === undefined) {
    res.status(400).json({
      ok: false,
      mensagem: "O nome é obrigatório"
    });
  } else {
    res.json({ usuario: body });
  }
});

app.put("/usuario/:id", function(req, res) {
  let id = req.params.id;

  res.json({ id });
});

app.delete("/usuario", function(req, res) {
  res.json("delete Usuario");
});

app.listen(process.env.PORT);
