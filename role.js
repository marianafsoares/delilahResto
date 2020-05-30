const Sequelize = require('sequelize');

const sequelize = new Sequelize('delilah', 'desarrollo', 'desarrollo', {
    host: 'localhost',
    dialect: 'mysql',
  })

  sequelize.authenticate()
  .then(() => {
    console.log('Conectado')
  })
  .catch(err => {
    console.log('No se conecto')
  })

  const roles = sequelize.define('roles', {
    id: {type: Sequelize.SMALLINT, primaryKey: true},
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {notEmpty: true,}
    },
  })

  function getAllRoles() {
    return roles.findAll()
  }

  function getById(idRole) {
    return roles.findOne({
        where: {
            id: idRole
        }
    }
    )
  }
  
  module.exports =  {getAllRoles, getById, roles};
  
