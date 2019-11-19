const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema;

let rolesValidos = {
  values: ["ADMIN_ROLE", "USER_ROLE"],
  message: "{VALUE} não é uma permissão válida"
};

let ususarioSchema = new Schema({
  nome: {
    type: String,
    required: [true, "O nome é obrigatório"]
  },
  email: {
    type: String,
    unique: true,
    required: [true, "O email é obrigatório"]
  },
  password: {
    type: String,
    required: [(true, "O password é obrigatório")]
  },
  img: {
    type: String,
    required: false
  },
  role: {
    type: String,
    default: "USER_ROLE",
    enum: rolesValidos
  }, // default 'USER_ROLE'
  estado: {
    type: Boolean,
    default: true
  }, // boolean
  google: {
    type: Boolean,
    default: false
  } // boolean
});

ususarioSchema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;

  return userObject;
};

ususarioSchema.plugin(uniqueValidator, {
  message: "O {PATH} deve ser único"
});

module.exports = mongoose.model("Usuario", ususarioSchema);
