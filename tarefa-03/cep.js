let express = require("express");

let router = express.Router();

const fs = require("fs");


router.get("/cep/", (req, res) => {
  fs.readFile("cep.json", (err, data) => {
    if (err) {
      throw err;
    }
    let ceps = JSON.parse(data);
    res.status(200).json(ceps);
  });
});


router.get("/cep/:cep([0-9]{5}-[0-9]{3})", (req, res) => {
  fs.readFile("cep.json", (err, data) => {
    if (err) {
      throw err;
    }
    let ceps = JSON.parse(data);

    res.status(200).json(ceps.filter((cidade) => cidade.cep == req.params.cep));
  });
});

router.post("/cep/:cep([0-9]{5}-[0-9]{3})/cidade/:cidade", (req, res) => {
  fs.readFile("cep.json", (err, data) => {
    if (err) {
      throw err;
    }
    let ceps = JSON.parse(data);

    ceps.push({
      cep: req.params.cep,
      cidade: req.params.cidade,
    });

    let cepsAtualizado = JSON.stringify(ceps, null, 2);

    fs.writeFileSync('cep.json', cepsAtualizado);

    res.status(200).json(ceps);
  });
});

module.exports = router;
