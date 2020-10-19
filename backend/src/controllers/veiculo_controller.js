// Vars
let Veiculo = require("../models/veiculo_model");

// Criar Registro
exports.new = function (req, res, next) {
  let veiculo = new Veiculo({
    /* Registro Real */
    placa: "KRB4664",
    chassi: "88HAtA0ATS9K69485",
    renavam: "03086981433",
    modelo: "Celer Hatch 1.5 16V Flex 5p",
    marca: "CHERY",
    ano: "2020",

    /* Registro de Teste
    placa: "KRB4664",
    chassi: "88HAtA0ATS9K69485",
    renavam: "03086981433",
    modelo: "Celer Hatch 1.5 16V Flex 5p",
    marca: "CHERY",
    ano: "2020",*/
  });
  veiculo.save(function (err) {
    if (err) {
      return next(err);
    }
    res.send("Veículo registrado com sucesso!");
  });
};

// Mostrar Registro Único
exports.details = function (req, res, next) {
  Veiculo.findById(req.params.id, function (err, product) {
    if (err) return next(err);
    res.send(product);
  });
};

// Mostrar todos os Registros
exports.list = function (req, res, next) {
  Veiculo.find({}, function (err, product) {
    if (err) return next(err);
    res.send(product);
  });
};

// Editar Registro
exports.edit = function (req, res, next) {
  Veiculo.findByIdAndUpdate(req.params.id, { $set: req.body }, function (
    err,
    product
  ) {
    if (err) return next(err);
    res.send("Veículo atualizado com sucesso!");
  });
};

// Deletar Registro
exports.delete = function (req, res, next) {
  Veiculo.findByIdAndRemove(req.params.id, function (err) {
    if (err) return next(err);
    res.send("Veículo removido com sucesso!");
  });
};
