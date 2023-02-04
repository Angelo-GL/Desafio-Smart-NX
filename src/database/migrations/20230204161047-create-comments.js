'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.createTable('Comments', {
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
       },
      author:{
        type: Sequelize.STRING,
        allowNull: false
      },
      contents:{
        type: Sequelize.STRING,
        allowNull: false
      },
      postid:{
        type: Sequelize.INTEGER,
        references:{
          model:"Posts",
          key: "id"
        },
        allowNull: false,
      },
      created_at:{
        type: Sequelize.DATE,
        allowNull:false
      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull:false
      }
      });
  },

  async down (queryInterface, Sequelize) {
   
    await queryInterface.dropTable('Comments');
     
  }
};
