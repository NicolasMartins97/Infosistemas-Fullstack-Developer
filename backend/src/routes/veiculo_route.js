// Vars
const express = require("express");
const router = express.Router();
const veiculo_controller = require("../controllers/veiculo_controller");

// Método GET
router.get("/veiculos", veiculo_controller.list);
router.get("/veiculos/:id", veiculo_controller.details);

// Método POST
router.post("/veiculos/new", veiculo_controller.new);

// Método PUT
router.put("/veiculos/edit/:id", veiculo_controller.edit);

// Método DELETE
router.delete("/veiculos/delete/:id", veiculo_controller.delete);

// Exportar
module.exports = router;
