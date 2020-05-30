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

  const users = sequelize.define('users', {
    id: {type: Sequelize.SMALLINT, primaryKey: true},
    nick_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {notEmpty: true,}
    },
    name: Sequelize.STRING, 
    last_name: Sequelize.STRING,
    email: Sequelize.STRING,
    phone: Sequelize.STRING,
    address: Sequelize.STRING,
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {notEmpty: true,}
    },
    role: Sequelize.SMALLINT,
  })

  function addUser(request) {
    return users.create({
        nick_name: request.body.nickName,
        name: request.body.name,
        last_name: request.body.lastName,
        email: request.body.email,
        phone: request.body.phone,
        address: request.body.address,
        password: request.body.password,
        role: request.body.role,
    })
  }

  function updateUser(request) {
    return users.update({
        name: request.body.name,
        last_name: request.body.lastName,
        email: request.body.email,
        phone: request.body.phone,
        address: request.body.address,
        password: request.body.password,
        role: request.body.role},
    {
        where: {
            id: request.params.id
        }
    }
    )
  }

  function deleteUser(request) {
    return users.destroy({
        where: {
            id: request.params.id
        }
    }
    )
  }

  function getAllUsers() {
    return users.findAll()
  }

  function getById(request) {
    return users.findOne({
        where: {
            id: request.params.id
        }
    }
    )
  }

  function getByNickName(request) {
    return users.findOne({
        where: {
            nick_name: request.params.nickName
        }
    }
    )
  }
  
  module.exports =  {addUser, updateUser, deleteUser, getAllUsers, getById, getByNickName, users};
  

  /*User.findAll({ attributes: ['nick_name', 'password'] })
  .then(users => {
    console.log(users.toJSON())
  })
  .catch(err => {
    console.log(err)
  })*/

