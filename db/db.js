var mongojs = require('mongojs')


// simple usage for a local db
var db = mongojs('mydb', ['mycollection'])

module.exports.eliminar = function (params, callback) {
    db.mycollection.remove({_id: mongojs.ObjectId(params.id)},true, function (err, result) {
        console.log("eliminar res ", result)
        console.log("eliminar err ", err)
        if (err) {
            callback(false, err)
        }else {
            callback(true, result)

        }
        // docs is now a sorted array

    })
}

module.exports.editar = function (params, callback) {
    // find one named 'mathias', tag him as a contributor and return the modified doc
    db.mycollection.findAndModify({
            query: {_id: mongojs.ObjectId(params.id)},
            update: {$set: {texto: params.texto}},
            new: true
        },
        function (err, result, lastErrorObject) {
            console.log("editar res ", result)
            console.log("editar err ", err)
            console.log("editar LEO ", lastErrorObject)

            if (err)
                callback(false, err)
            else if (result.texto === params.texto)
                callback(true, result)
            else
                callback(false, {error: "Error al actualizar"})
        })
}

module.exports.crear = function (params, callback) {
    db.mycollection.insert({texto: params.texto, fecha: new Date()}, function (err, result) {
        console.log("crear res ", result)
        console.log("crear err ", err)
        if (err)
            callback(false, err)
        else
            callback(true, result)
    })


}

module.exports.todos = function (params, callback) {
    db.mycollection.find().sort({fecha: 1}, function (err, result) {
        console.log("todos res ", result)
        console.log("todos err ", err)
        // docs is now a sorted array
        if (err)
            callback(false, err)
        else
            callback(true, result)
    })
}