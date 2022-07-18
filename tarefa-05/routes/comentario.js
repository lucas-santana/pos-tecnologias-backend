const express = require("express");

const router = express.Router();
const bcrypt = require("bcrypt");

const Comentario = require("../models/comentario"); //importar  a coleção



router.post("/", async (req, res) => {
   

    Comentario.findOne({
        usuario: req.body.usuario,
        email: req.body.email,
        comentario: req.body.comentario,
    })
    .then(async (regComentario) => {

        if (regComentario) {

            const senha = await bcrypt.compare(req.body.senha, regComentario.senha);
    
            if (!senha) {
                return res.status(400).json({ userError: "Senha incorreta" });
            }

            return res
                .status(400)
                .json({ emailerror: "Erro: comentário já existe no sistema!" });
        } else {
            const objComentario = Comentario({
                usuario: req.body.usuario,
                email: req.body.email,
                comentario: req.body.comentario,
                senha: req.body.senha,
            });

            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(objComentario.senha, salt, function (err, hash) {
                // Store hash in your password DB.
                if (err) throw err;
                objComentario.senha = hash;

                objComentario
                    .save()
                    .then((p) => res.json(p))
                    .catch((err) => console.log(err));
                });
            });
        }
    })
    .catch((err) => console.log(err));
    });

module.exports = router;
