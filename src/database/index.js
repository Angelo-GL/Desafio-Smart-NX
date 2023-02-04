const sequelize = require('sequelize');
const config = require('../config/database')

const Posts = require('../models/Posts')
const Comments = require('../models/Comments')


const connection = new sequelize(config)

Posts.init(connection)
Comments.init(connection)


module.exports = connection
