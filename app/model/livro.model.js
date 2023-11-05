module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            titulo: String,
            descricao: String,
            publicado: Boolean
        },
        { timestamp: true}
    )

    schema.method("toJSON", function (){
        const {_v, _id, ...object} = this.object()
        object.id = _id
        return object
    })

    return mongoose.model("livro", schema)
}

