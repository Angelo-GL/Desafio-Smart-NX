const Posts = require('../models/Posts')
const Comments = require('../models/Comments')
const { existsOrError } = require('../validations/validations');


const saveOrUpdate = async (req, res) => {
    const post = { ...req.body }


    if (req.params.id) post.id = req.params.id

    try {
        existsOrError(post.author, "Autor do post não informado!")
        existsOrError(post.title, "Título do post não informado!")
        existsOrError(post.contents, "Conteudo do post não informado!")
    } catch (msg) {
        return res.status(400).send(msg)
    }

    try {
        if (post.id) {

            const postFromDB = await Posts.findOne({
                where: { id: post.id }
            })


            if (!postFromDB) {
                return res.status(401).json({ message: "Nenhum post encontrado!" })
            } else {
                const postUpdate = await Posts.update(post, { where: { id: post.id } })
                res.status(200).json({ message: "Atualização concluida!" })
            }
        } else {
            await Posts.create(post)
            res.status(200).json({ message: "Cadastro concluido!" })
        }

    } catch (error) {
        res.status(500).send(error)
    }
}


const findAll = async (req, res) => {
    const { page = 0, size = 5 } = req.query

    let options = {
        limit: +size,
        offset: (+page) * (+size)
    }
    try {

        const { count, rows } = await Posts.findAndCountAll(options)

        res.status(200).json({
            status: 'sucess',
            total: count,
            posts: rows
        })
    } catch (err) {
        res.status(400).json(err)
    }
}

const findById = async (req, res) => {
    try {
        const _post = await Posts.findOne({ where: { id: req.params.id } })
        if (!_post) {
            return res.status(401).json({ message: `Nenum post encontrado a partir do id ${req.params.id}` })
        }

        res.status(200).json(_post)
    } catch (error) {
        res.status(400).send(error)
    }
}

const deletPosts = async (req, res) => {
    const { id } = req.params

    try {
        const posts = await Posts.findOne({ where: { id } })
        if (!posts) {
            return res.status(401).json({ message: "Post não encontrado!" })
        }
        
        const listComments = await Comments.findAll({
            attributes: ['id'],
            where: { postid: id }
        });

        const listId = listComments.map(c => c.dataValues.id)

        for (const id of listId) {
            const deletesPost = await Comments.destroy({ where: { id } })
        }

        const deletesPost = await Posts.destroy({ where: { id } })
        res.status(200).json({ message: "Post exluido!" })

    } catch (err) {
        console.log(err);
        res.status(400).send(err)
    }
}

module.exports = { saveOrUpdate, findAll, findById, deletPosts }