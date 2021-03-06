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
    id_order: {type: Sequelize.SMALLINT, foreignKey: true, primaryKey: true},
    id_dish: {type: Sequelize.SMALLINT, foreignKey: true, primaryKey: true},
    cant_dish: {type: Sequelize.SMALLINT},
    price_dish: {type: Sequelize.REAL},
  })


  function getByOrderId(idOrder) {
    return orders_dishes.findOne({
        where: {
            id_order: idOrder
        }
    }
    )
  }

  function addOrderDish(request, idOrder) {
    return orders_dishes.create({
        id_order: idOrder,
        id_dish: request.id_dish,
        cant_dish: request.cant_dish,
        price_dish: request.price_dish,
    })
  }

  function deleteOrderDish(idOrder) {
    return orders_dishes.destroy({
        where: {
            id_order: idOrder
        }
    }
    )
  }
  
  module.exports =  {getByOrderId, addOrderDish, deleteOrderDish, orders_dishes};
  
