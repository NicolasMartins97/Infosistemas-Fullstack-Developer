// Vars
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const veiculos = require("./src/routes/veiculo_route");
const app = express();
let port = 3080;
let database = mongoose.connection;
let url =
  "mongodb+srv://SystemAdmin:InfoSystem007@infosistemas.sehuz.mongodb.net/InfoSistemas?retryWrites=true&w=majority";
let mongoDB = process.env.MONGODB_URI || url;

// Conectar ao MongoDB
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.Promise = global.Promise;
database.on(
  "error",
  console.error.bind(console, "Falha ao tentar conectar no MongoDB!")
);

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", veiculos);

// Iniciar o Servidor
app.listen(port, function () {
  console.log("Servidor rodando na Porta: " + port);
});
