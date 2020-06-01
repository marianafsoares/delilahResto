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

  const dishes = sequelize.define('dishes', {
    id: {type: Sequelize.SMALLINT, primaryKey: true},
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {notEmpty: true,}
    },
    category: {type: Sequelize.STRING},
    description: {type: Sequelize.STRING},
    price: {type: Sequelize.REAL},
    requestedBy: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {notEmpty: true,}
  },
  })

  function getAllDishes() {
    return dishes.findAll()
  }

  function getById(idDish) {
    return dishes.findOne({
        where: {
            id: idDish
        }
    }
    )
  }

  function addDish(request) {
    return dishes.create({
        name: request.body.name,
        category: request.body.category,
        description: request.body.description,
        price: request.body.price,
        requestedBy: request.body.requestedBy,
    })
  }

  function updateDish(request) {
    return dishes.update({
      name: request.body.name,
      category: request.body.category,
      description: request.body.description,
      price: request.body.price,
      requestedBy: request.body.requestedBy},
      
    {
        where: {
            id: request.params.id
        }
    }
    )
  }

  function deleteDish(request) {
    return dishes.destroy({
        where: {
            id: request.params.id
        }
    }
    )
  }
  
  module.exports =  {getAllDishes, getById, addDish, updateDish, deleteDish, dishes};
  
