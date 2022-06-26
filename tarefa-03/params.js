let express = require('express');
let router = express.Router();

router.get('/:param', (req, res) => {
    res.send(`Parametro informado: ${req.params.param}`);
});

router.get('/user/:user/nome/:nome', (req, res) => {
    res.send(`Usuário: ${req.params.user} <br>Nome: ${req.params.nome}`);
});

module.exports = router;