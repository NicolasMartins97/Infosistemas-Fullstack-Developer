// Vars
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Modelo
let VeiculoSchema = new Schema({
  placa: { type: String, required: true, min: 7, max: 7 },
  chassi: { type: String, required: true, min: 17, max: 17 },
  renavam: { type: String, required: true, min: 11, max: 11 },
  modelo: { type: String, required: true, min: 1, max: 50 },
  marca: { type: String, required: true, min: 1, max: 30 },
  ano: { type: String, required: true, min: 4, max: 4 },
});

// Exportar
module.exports = mongoose.model("Veiculo", VeiculoSchema);
