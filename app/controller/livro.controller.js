const db = require ("../model")
const Livro = db.livros

//criar um livro
exports.create = (req, res) => {
    //valida requisição
    if(!req.body.titulo){
        res.status(400).send({message: "O conteúdo não pode ser vazio."})
        return
    }

    //validou tem dados - create
    const livro = new Livro({
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        publicado: req.body.publicado ? req.body.publicado : false
        }
    )

    //save
    Livro.save(livro).then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erro ao criar livro."
        })
    })

}


// Recuperar todos os livros
exports.findAll = (req, res) => {
    const titulo = req.query.titulo;
    var condicao = titulo ? { titulo: { $regex: new RegExp(titulo, 'i') } } : {};
    Livro.find(condicao).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erro ao recuperar os livros."
        });
    });
};


//recuperar por ID
exports.findOne = (req, res) => {
    const id = req.params.id
    Livro.findById(id).then(data => {
        if(!data)
            res.status(404).send({message: "Não encontrado" + id})
        else
            res.send(data)
    }).catch(err =>{
        res.status(500).send({message: "ID não encontrado" + id})
    })
}


//alterar
exports.findOne = (req, res) => {
    if(!req.body){
        return res.status(400).send({
            message: "Dados não poedm ser vazio!"
        })
    }

    const id = req.prams.id
    Livro.findByIdAndUpdate(id, req.body, {userFindAndModify: false}).then(data =>{
        if(!data){
            res.status(404).send({
                message: `Não foi possível alterar id=${id}. Livro não encontrado`
            })
        }else
            res.send({message: "Livro atualizado com sucesso"})
    }).catch(err =>{
        res.status(500).send({
            message: `Não foi possível atualizar o id ${id}`
        })
    })

}


//deletar
exports.delete = (req,res) => {
    const id = req.params.id

    Livro.findByIdAndRemove(id, req.body, {userFindAndModify: false}).then(data =>{
        if (!data){
            res.status(404).send({
                message: `Não foi possivel deletar o id=${id}. Livro não encontrado`
            })
        }else
            res.send({message: "Livro deletado com sucesso"})
    }).catch(err =>{
        res.status(500).send({
            message: `Não foi possível deletar o id ${id}`
        })
    })
}


//deletar tudo
exports.deleteAll = (req, res) => {
    Livro.deleteMany({}).then(data => {
        res.send({
            message: `${data.deletedCount} livros foram deletados`
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erro ao deletar livros."
        })
    })
}

// exports. findAllPublicados = (req,res) => {
//     Livro.find({publicado: true})
// }

// Recuperar todos os livros publicados
exports.findAllPublicados = (req, res) => {
    Livro.find({ publicado: true }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erro ao recuperar livros publicados."
        });
    });
};