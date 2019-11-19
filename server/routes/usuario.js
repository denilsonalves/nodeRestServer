const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("underscore");
const Usuario = require("../models/usuario");
const app = express();

// --------------- Início Listar Usuários ---------------------
app.get("/usuario", function(req, res) {
  let desde = req.query.desde || 0;
  desde = Number(desde);

  let limite = req.query.limite || 5;
  limite = Number(limite);

  Usuario.find({ estado: true }, "nome email role estado img google")
    .skip(desde)
    .limit(limite)
    .exec((err, usuarios) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      Usuario.countDocuments({ estado: true }, (err, contaRegistros) => {
        res.json({
          ok: true,
          usuarios,
          quantidadesResgistros: contaRegistros
        });
      });
    });
});
// --------------- Fim ------------------------------------------

// --------------- Início Criar Usuário -------------------------
app.post("/usuario", function(req, res) {
  let body = req.body;

  let usuario = new Usuario({
    nome: body.nome,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role
  });

  usuario.save((err, usuarioDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err: err
      });
    }

    // usuarioDB.password = null;

    res.json({
      ok: true,
      usuario: usuarioDB
    });
  });
});
// --------------- Fim ------------------------------------------

// --------------- Início Atualizar Usuário ---------------------
app.put("/usuario/:id", function(req, res) {
  let id = req.params.id;
  let body = _.pick(req.body, ["nome", "email", "img", "role", "estado"]);

  Usuario.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true },
    (err, usuarioDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        usuario: usuarioDB
      });
    }
  );
});
// --------------- Fim -----------------------------------------

// --------------- Início Deletar Usuário ----------------------
app.delete("/usuario/:id", function(req, res) {
  let id = req.params.id;

  Usuario.findByIdAndRemove(id, (err, usuarioApagado) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    if (!usuarioApagado) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "Usuário não encontrado"
        }
      });
    }

    res.json({
      ok: true,
      usuario: usuarioApagado
    });
  });
});
// --------------- Fim -----------------------------------------

// --------------- Início Desativar Usuário ----------------------
app.delete("/usuario/estado/:id", function(req, res) {
  let id = req.params.id;

  let mudarEstado = {
    estado: false
  };

  Usuario.findByIdAndUpdate(
    id,
    mudarEstado,
    { new: true },
    (err, usuarioEstadoAlterado) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      if (!usuarioEstadoAlterado) {
        return res.status(400).json({
          ok: false,
          err: {
            message: "Usuário não encontrado"
          }
        });
      }

      if (!usuarioEstadoAlterado.estado) {
        return res.status(400).json({
          ok: false,
          err: {
            message: "Usuário já está desativado"
          }
        });
      }

      res.json({
        ok: true,
        usuario: usuarioEstadoAlterado
      });
    }
  );
});
// --------------- Fim -----------------------------------------
module.exports = app;
