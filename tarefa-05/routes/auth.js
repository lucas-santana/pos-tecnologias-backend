const express = require("express");

const router = express.Router();
const bcrypt = require('bcrypt');
const Pessoa = require("../models/pessoa"); //importar  a coleção

router.post("/signup", (req, res) => {
  Pessoa.findOne({ email: req.body.email })
    .then((docPessoa) => {
      if (docPessoa) {
        return res
          .status(400)
          .json({ emailerror: "Email já registrado no sistema" });
      } else {
        const objPessoa = Pessoa({
          name: req.body.name,
          email: req.body.email,
          senha: req.body.senha,
          userName: req.body.userName,
        });

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(objPessoa.senha, salt, function(err, hash) {
                // Store hash in your password DB.
                if(err) throw err;
                objPessoa.senha = hash;
                
                objPessoa
                .save()
                .then(p => res.json(p))
                .catch(err => console.log(err))
            });
        });

     ;
      }
    })
    .catch(err => console.log(err));
});
router.get("/", (req, res) => res.json({ test: "Acesso permitido" }));

module.exports = router;
