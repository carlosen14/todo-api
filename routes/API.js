var express = require('express');
var router = express.Router();
var db = require('../db/db')

/* GET home page. */
router.post('/eliminar', function (req, res, next) {

    db.eliminar({id:req.body.id}, function (success, cb) {
        console.log(cb)
        res.json({success: success, result: cb})
    })
});

router.post('/editar', function (req, res, next) {
    db.editar({id: req.body.id, texto: req.body.texto}, function (success, cb) {
        console.log(cb)
        res.json({success: success, result: cb})
    })
});

router.get('/todos', function (req, res, next) {
    db.todos({}, function (success, cb) {
        console.log(cb)
            res.json({success: success, result: cb})

    })
});

router.post('/crear', function (req, res, next) {
    db.crear({texto: req.body.texto}, function (success, cb) {
        console.log(cb)
        res.json({success: success, result: cb})
    })
});


module.exports = router;




