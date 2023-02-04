const Comment = require('../models/Comments')
const Posts = require('../models/Posts')
const {existsOrError} = require('../validations/validations');

const saveOrUpdate = async (req, res) =>{
    const comments = {...req.body}
        
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

        if(!postentFromDB) return res.status(401).json({message: `Id do Post não encontrado!`})
        
        if(comments.id){
            
            const commmentFromDB = await Comment.findOne({
                where: { id: comments.id  }
            })
               
            
            if(!commmentFromDB){
                return res.status(401).json({message: "Nenhum commentário encontrado!"})
            }else{
                await Comment.update(comments, { where: { id: comments.id }})
                res.status(204).send()
            }
        } else {
            const resutlCriete = await Comment.create(comments)
            res.status(204).send()
        }
        

    } catch (error) {
        console.log(error);
        console.log(error);
        res.status(500).send(error)
    }
}

module.exports = {saveOrUpdate}