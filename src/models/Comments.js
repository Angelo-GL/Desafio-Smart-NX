const {Model, DataTypes} = require('sequelize')

class Comments extends Model{
    static init(sequelize){
        super.init({
            author: DataTypes.STRING,
            contents: DataTypes.STRING,
            postid: DataTypes.INTEGER,
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE
        }, {
            sequelize
        })
        Comments.associate = (model) => {
            Comments.belongsTo(model.Posts, {foreignKey: 'postid'})
        }
    }
}

module.exports = Comments