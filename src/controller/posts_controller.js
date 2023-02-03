const { Op } = require('sequelize');
const Posts = require('../models/Posts')
const {existsOrError, notExistsOrError, equalsOrError} = require('../validations/validations');
const { post } = require('../config/routes');

const saveOrUpdate = async (req, res) =>{
    const post = {...req.body}
    
    
    if(req.params.id) post.id = req.params.id
    
    try {
    existsOrError(post.author, "Autor do post não informado!")
    existsOrError(post.title, "Título do post não informado!")
    existsOrError(post.contents, "Conteudo do post não informado!")   
    } catch (msg) {
        return res.status(400).send(msg)
    }

    try {
        if(post.id){
            
            const postFromDB = await Posts.findOne({
                where: { id: post.id  }
            })
               
            
            if(!postFromDB){
                return res.status(401).json({message: "Nenhum post encontrado!"})
            }else{
                const postUpdate = await Posts.update(post, { where: { id: post.id }})
                res.status(204).send()
            }
        } else {
            await Posts.create(post)
            res.status(204).send("")
        }

    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}


const findAll = async (req, res) => {
    try {

        const listPosts = await Posts.findAll({
            attributes: ['id', 'author', 'title', 'contents', 'image_url' ],
        })
        if(listPosts.length === 0){
            return res.status(401).json({message: 'Nenhum post Cadastrado!'})
        }
        
       res.status(200).json(listPosts)
    } catch (msg) {
        res.status(400).json(msg)
    }
}

const deletPosts = async (req, res) => {
    const {id} = req.params

    try {
        const posts = await Posts.findOne({where: { id }})
        if(!posts){
           return res.status(401).json({message: "Post não encontrado"})
        }

        const deletesPost = await Posts.destroy({where: {id}})
        res.status(200).json({message: "Post exluido!"})
        
    } catch (err) {
        res.status(400).send(err)
    }
}

module.exports = {saveOrUpdate, findAll, deletPosts}