const {Router} =require('express')

const route = Router()

route.get('/', (req, res) => {
    res.send('ola mundo')
})

module.exports = route