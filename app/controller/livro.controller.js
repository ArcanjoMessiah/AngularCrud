const res = require("express/lib/response");
const db = require("../model");
const Livro = db.livro;

//Criar mensagem 
exports.create = (req,res) =>{
    //valida req
    if(!req.body.titulo){
        res.status(400).send({message: "COnteúdo não pode ser vazio"});
        return;
    }
    //Validou tem dados - create
    const livro = new Livro({
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        publicado: req.body.publicado ? req.body.publicado: false
    });

    //Save
    livro.save(livros).then(data=> {
        res.send(data);

    }).catch(err=> {
        res.status(500).send({
            message: err.message || "Erro ao criar livro."
        });
    });
};

//recuperar livro 

exports.findAll = (req,res) => {
    const titulo = req.body.titulo;
    var condicao = titulo ? {titulo: {$regex: new RegExp(titulo), $options:"i"}}:{};

    Livro.find(condicao).then(data =>{
        res.send(data);
    }).catch(err=>{
        res.status(500).send({
            message: err.message || "Erro ao recuperar livro"
    })
});
};

//Recuperar por ID
exports.findOne = (req,res) => {
    const id = req.params.id;
    
    Livro.findById(id).then(data =>{
        if (!data)
        res.status(404).send({message: "Não encontrado" + id});
        else res.send(data);
    }).catch(err => {
        res.status(500).send({message: "Id não encontrado" + id})
    });
};

//Alterar Livro 
exports.update = (req,res) => {
    if(!req.bdy){
        return res.status(400).send({
            message: "Campos não podem ser vazios!"
        });
    }

    const id = req.params.id; 

    Livro.findByIdAndUpdate(id, req,body, {userfindAndModify:false}).then(data =>{
        if(data){
            res.status(404).send({
                message: 'Não foi possivel altear id=$(id) Livro não encontrado'
            });
        } else res.send({message: "Livro atualizado com sucesso "});
    }).catch(err =>{
        res.status(500).send({
            message: "Não foi possivel alterar livro" 
        });
    });
};

//Alterar Livro 
exports.delete = (req,res) => {
    if(!req.bdy){
        return res.status(400).send({
            message: "Campos não podem ser vazios!"
        });
    }

    const id = req.params.id; 

    Livro.findByIdAndDelete(id, req,body, {userfindAndModify:false}).then(data =>{
        if(data){
            res.status(404).send({
                message: 'Não foi possivel deletar id=$(id) Livro não encontrado'
            });
        } else res.send({message: "Livro deletado com sucesso "});
    }).catch(err =>{
        res.status(500).send({
            message: "Não foi possivel deletar" + id
        });
    });
};

//Deletar tudo 
exports.deleteAll = (req,res) =>{
    Livro.deleteMany({}).then(data =>{
        res.send({message:'$(data.deletedCount) livros foram apagados'});
        
    }).catch(err =>{
        res.status(500).send({
            message: err.message || "Erro ao deletar todos os livros."
        });
    });

};




