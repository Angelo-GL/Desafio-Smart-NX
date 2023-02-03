const {Model, DataTypes} = require('sequelize')

class Comments extends Model{
    static init(sequelize){
        super.init({
            author: DataTypes.STRING,
            contents: DataTypes.STRING,
        }, {
            sequelize
        })
        Comments.associate = (model) => {
            Comments.belongsTo(model.Posts, {foreignKey: 'posts_Id'})
        }
    }
}

module.exports = Comments