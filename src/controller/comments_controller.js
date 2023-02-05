const Comment = require('../models/Comments')
const Posts = require('../models/Posts')
const {existsOrError} = require('../validations/validations');

const saveOrUpdate = async (req, res) =>{
    const comments = { ...req.body }
        
    if(req.params.id) comments.id = req.params.id
    
    try {
    existsOrError(comments.author, "Autor do comentario não informado!")
    existsOrError(comments.contents, "Conteudo do comentário não informado!")
    existsOrError(comments.postid, "Id do post não informado!")   
    } catch (msg) {
        return res.status(400).send(msg)
    }

    try {
        const postentFromDB = await Posts.findOne({ where: { id: comments.postid } })

        if(!postentFromDB) return res.status(401).json({ message: `Id do Post não encontrado!` })
        
        if(comments.id) {    
            const commmentFromDB = await Comment.findOne({
                where: { id: comments.id  }
            })
            
            if(!commmentFromDB){
                return res.status(401).json({message: "Nenhum commentário encontrado!"})
            } else {
                await Comment.update(comments, { where: { id: comments.id }})
                res.status(200).json({message: "Atualização concluida!"})
            }
        } else {
            const resutlCriete = await Comment.create(comments)
            res.status(204).send()
        }

    } catch (error) {
        res.status(500).send(error)
    }
}

const findAll = async (req, res) => {
    const { page = 0, size =5 } = req.query

    let options = {
        limit: +size,
        offset: (+page) * (+size)
    }
    try {
        const {count, rows} = await Comment.findAndCountAll(options)
        
        res.status(200).json({
        status: 'sucess',
        total: count,
        posts: rows
       })
    } catch (err) {
        res.status(400).json(err)
    }
}

const deletComments = async (req, res) => {
    const {id} = req.params

    try {
        const posts = await Comment.findOne({ where: { id } })
        if(!posts) {
           return res.status(401).json({ message: "Comentário não encontrado" })
        }

        const deletesPost = await Comment.destroy({ where: { id } })
        res.status(200).json({ message: "Comentário exluido!" })
        
    } catch (err) {
        res.status(400).send(err)
    }
}

const findById = async (req, res) => {
    try {
        const _post = await Comment.findOne({ where: { id: req.params.id } })
        if(!_post) {
            return res.status(401).json( { message: `Nenhum COmentário encontrado a partir do id ${req.params.id}` } )
        }

        res.status(200).json(_post)
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = {saveOrUpdate, findAll, deletComments, findById}