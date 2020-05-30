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

  const orders_dishes = sequelize.define('orders_dishes', {
    id_order: {type: Sequelize.SMALLINT},
    id_dish: {type: Sequelize.SMALLINT},
  })


  function getByOrderId(idOrder) {
    return orders_dishes.findOne({
        where: {
            id: idOrder
        }
    }
    )
  }

  function addOrderDish(request) {
    return order_dishes.create({
        id_order: request.body.id_user,
        id_dish: request.body.date,
    })
  }

  function deleteOrderDish(request) {
    return order_dishes.destroy({
        where: {
            id: request.params.id
        }
    }
    )
  }
  
  module.exports =  {getByOrderId, addOrderDish, deleteOrderDish, orders_dishes};
  
