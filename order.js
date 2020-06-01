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

  const orders = sequelize.define('orders', {
    id: {type: Sequelize.SMALLINT, primaryKey: true},
    id_user: {type: Sequelize.SMALLINT, foreignKey: true},
    date: {type: Sequelize.DATE},
    payment: {type: Sequelize.STRING},
    status: {type: Sequelize.STRING},    
    price: {type: Sequelize.REAL},
    adress_user: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {notEmpty: true,}
    },
    phone_user: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {notEmpty: true,}
  },
    comments: {type: Sequelize.STRING},
  })

  function getAllOrders() {
    return orders.findAll()
  }

  function getById(idOrder) {
    return orders.findOne({
        where: {
            id: idOrder
        }
    }
    )
  }



function getMaxId(request) {
  return orders.findAll({
  attributes: [[sequelize.fn('max', sequelize.col('id')), 'maxId']],
  raw: true,
});
}

  function addOrder(request) {
    return orders.create({
        id_user: request.body.id_user,
        date: request.body.date,
        payment: request.body.payment,
        status: request.body.status,
        price: request.body.price,
        adress_user: request.body.adress_user,
        phone_user: request.body.phone_user,
        comments: request.body.comments,
    })
  }

  function updateOrder(request) {
    return orders.update({
      id_user: request.body.id_user,
      date: request.body.date,
      payment: request.body.payment,
      status: request.body.status,
      price: request.body.price,
      adress_user: request.body.adress_user,
      phone_user: request.body.phone_user,
      comments: request.body.comments,
    
        where: {
            id: request.params.id
        }
    }
    )
  }

  function deleteOrder(request) {
    return orders.destroy({
        where: {
            id: request.params.id
        }
    }
    )
  }
  
  module.exports =  {getAllOrders, getById, addOrder, updateOrder, deleteOrder, getMaxId, orders};
  
