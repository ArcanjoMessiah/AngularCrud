const db = require("../model"); // Certifique-se de importar o modelo correto do seu aplicativo
const Autor = db.autor; // Certifique-se de que o modelo seja chamado 'autor'

// Criar um novo autor
exports.create = (req, res) => {
  // Validação dos campos obrigatórios
  if (!req.body.nome || !req.body.sobrenome || !req.body.email || req.body.ativo === undefined) {
    return res.status(400).send({ message: "Campos obrigatórios não podem ser vazios." });
  }

  // Criar um novo objeto Autor com os dados da requisição
  const autor = new Autor({
    nome: req.body.nome,
    sobrenome: req.body.sobrenome,
    email: req.body.email,
    telefone: req.body.telefone,
    ativo: req.body.ativo
  });

  // Salvar o autor no banco de dados
  autor
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Erro ao criar autor."
      });
    });
};

// Recuperar todos os autores
exports.findAll = (req, res) => {
  Autor.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Erro ao recuperar autores."
      });
    });
};

// Recuperar um autor por ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Autor.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Autor não encontrado com o ID " + id });
      else res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: "Erro ao recuperar autor com o ID " + id });
    });
};

// Atualizar um autor por ID
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Campos não podem ser vazios."
    });
  }

  const id = req.params.id;

  Autor.findByIdAndUpdate(id, req.body, { new: true })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: 'Não foi possível atualizar o autor com o ID ' + id + ". Autor não encontrado."
        });
      } else res.send({ message: "Autor atualizado com sucesso." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao atualizar o autor com o ID " + id
      });
    });
};

// Excluir um autor por ID
exports.delete = (req, res) => {
  const id = req.params.id;

  Autor.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: 'Não foi possível excluir o autor com o ID ' + id + ". Autor não encontrado."
        });
      } else res.send({ message: "Autor excluído com sucesso." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao excluir o autor com o ID " + id
      });
    });
};

// Excluir todos os autores
exports.deleteAll = (req, res) => {
  Autor.deleteMany({})
    .then(data => {
      res.send({ message: `${data.deletedCount} autores foram excluídos.` });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Erro ao excluir todos os autores."
      });
    });
};
