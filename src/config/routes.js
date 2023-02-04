const {Router} =require('express')
const controllerPost = require('../controller/posts_controller')
const controllerComment = require('../controller/comments_controller')

const route = Router()

// ===== Rotas de Posts ======
route.post('/posts', controllerPost.saveOrUpdate)
route.get('/posts', controllerPost.findAll)
route.put('/posts/:id', controllerPost.saveOrUpdate)
route.delete('/posts/:id',controllerPost.deletPosts)
route.get('/posts/:id', controllerPost.findById)

// ===== Rotas de Comments ======
route.post('/comments', controllerComment.saveOrUpdate)
route.put('/comments/:id', controllerComment.saveOrUpdate)


module.exports = route