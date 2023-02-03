const {Router} =require('express')
const controllerPost = require('../controller/posts_controller')

const route = Router()

route.post('/posts', controllerPost.saveOrUpdate)
route.put('/posts/:id', controllerPost.saveOrUpdate)

module.exports = route