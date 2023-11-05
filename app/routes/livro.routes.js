const livrosController = require("../controller/livro.controller");
module.exports = app => {

    var router = require("express").Router()

    //criar
    router.post("/", livrosController.create)

    //recuperar todos
    router.get("/", livrosController.findAll)

    //recuperar por publicacao
    router.get("/publicado", livrosController.findAllPublicados)

    //recuperar por id
    router.get("/:id", livrosController.findOne)

    //update por id
    router.put("/:id", livrosController.update)

    //deletar por id
    router.delete("/:id", livrosController.delete)

    //deletar todos
    router.delete("/", livrosController.deleteAll)

    app.use("/api/livros", router)

}