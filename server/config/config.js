// =======================================
// Configuração da porta
// =======================================
process.env.PORT = process.env.PORT || 3000;

// =======================================
// Entorno
// =======================================
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

// =======================================
// BaseDados
// =======================================
let urlDB;

if (process.env.NODE_ENV === "dev") {
  urlDB = "mongodb://localhost:27017/cafe";
} else {
  urlDB =
    "mongodb+srv://aragorn:FupvY0j1odyD2DU7@nodecafe-nclr1.mongodb.net/cafe";
}

process.env.URLDB = urlDB;
