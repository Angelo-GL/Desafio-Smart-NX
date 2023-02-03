const { Op } = require('sequelize');
const Posts = require('../models/Posts')
const {existsOrError, notExistsOrError, equalsOrError} = require('../validations/validations')

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

module.exports = {saveOrUpdate}