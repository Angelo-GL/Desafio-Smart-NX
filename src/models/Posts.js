const { Model, DataTypes } = require('sequelize')

class Posts extends Model {
    static init(sequelize) {
        super.init( {
            author: DataTypes.STRING,
            title: DataTypes.STRING,
            contents: DataTypes.STRING,
            image_url: DataTypes.STRING,
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE

        }, {
            sequelize
        })
        Posts.associate = (models) => {
            Posts.hasMany(models.Comments, { foreignKey: "postid" })
            
        }
    }
}

module.exports = Posts