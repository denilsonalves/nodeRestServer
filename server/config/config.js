// =======================================
// Configuração da porta
// =======================================
process.env.PORT = process.env.PORT || 3000;

// =======================================
// Entorno
// =======================================
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

// =======================================
// Vencimento do token
// =======================================
// 60s * 60m * 24h* 30d
process.env.VENCIMENTO_TOKEN = 60 * 60 * 24;

// =======================================
// Geração do secret jwt
// =======================================
process.env.GERACAO =
  process.env.GERACAO || "geracao-do-secret-de-desenvolvimento";

// =======================================
// BaseDados
// =======================================
let urlDB;

if (process.env.NODE_ENV === "dev") {
  urlDB = "mongodb://localhost:27017/cafe";
} else {
  urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;
