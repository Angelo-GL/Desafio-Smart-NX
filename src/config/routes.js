const {Router} =require('express')
const controllerPost = require('../controller/posts_controller')

const route = Router()

route.post('/posts', controllerPost.saveOrUpdate)
route.get('/posts', controllerPost.findAll)
route.put('/posts/:id', controllerPost.saveOrUpdate)
route.delete('/posts/:id',controllerPost.deletPosts)
route.get('/posts/:id', controllerPost.findById)

module.exports = route