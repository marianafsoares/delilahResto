const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const config = require('./config')

const app = express()
const port = process.env.PORT || 3001

app.set('llave', config.llave);
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const users = require("./user.js");

app.post('/api/user/add', function (request, response) {

    return users.addUser(request)
    .then(function (users) {
        if (users) {
            response.send(users);
        } else {
            response.status(400).send('Error in insert new record');
        }
    })
    .catch(err=>response.status(400).send(err.parent.sqlMessage));        
});

app.post('/api/autenticar', (request, response) => {
    return users.getByNickName(request.body.user)
    .then(function (users) {
        if (users){
            if (users.toJSON().password==request.body.password){
                const payload = {
                check:  true
                };
                const token = jwt.sign(payload, app.get('llave'), {
                expiresIn: 1440
                });
                response.json({
                mensaje: 'Autenticación correcta',
                token: token
                });
            } else {
                response.json({ mensaje: "Contraseña incorrectos"})
            }
        }else{
            response.json({ mensaje: "Usuario inexistente"})
        }
    })
})

const rutasProtegidas = express.Router();
rutasProtegidas.use((req, res, next) => {
    const token = req.headers['access-token'];
 
    if (token) {
      jwt.verify(token, app.get('llave'), (err, decoded) => {      
        if (err) {
          return res.json({ mensaje: 'Token inválida' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.send({ 
          mensaje: 'Token no proveída.' 
      });
    }
 });


//Endpoints para Roles
const roles = require("./role.js");

app.get('/api/role/getAll', rutasProtegidas, (request, response) => {
    return roles.getAllRoles()
    .then(function (roles) {
        if (roles) {
            response.send(roles);
            
        } else {
            response.status(400).send('Error');
        }
    });
})
app.get('/api/role/getById/:id', rutasProtegidas, (request, response)=>{
    return roles.getById(request.params.id)
    .then(function (roles) {
        if (roles) {
            response.send(roles);
        } else {
            response.status(400).send('Error');
        }
    });
})


//Endpoints para Users

app.put('/api/user/update/:id', rutasProtegidas, function (request, response) {
    return users.updateUser(request)
    .then(function (users) {
        if (users) {
            response.status(200).send('El usuario ' + request.params.id + ' ha sido actualizado con éxito')
        } else {
            response.status(400).send('Error in update new record');
        }
    });    
});
app.delete('/api/user/delete/:id', rutasProtegidas, function (request, response) {
    return users.deleteUser(request)
    .then(function (users) {
        if (users) {
            response.status(200).send('El usuario ' + request.params.id + ' ha sido eliminado con éxito')
        } else {
            response.status(400).send('Error in delete new record');
        }
    });    
});
app.get('/api/user/getAll', rutasProtegidas, (request, response) => {
    return users.getAllUsers()
    .then(function (users) {
        if (users) {
            response.send(users);
            
        } else {
            response.status(400).send('Error');
        }
    });
})
app.get('/api/user/getById/:id', rutasProtegidas, (request, response)=>{
    return users.getById(request)
    .then(function (users) {
        if (users) {
            response.send(users);
        } else {
            response.status(400).send('Error');
        }
    });
})
app.get('/api/user/getByNickName', rutasProtegidas, (request, response)=>{
    return users.getByNickName(request.body.nickName)
    .then(function (users) {
        if (users) {
            response.send(users);
        } else {
            response.status(400).send('No existe el nickName ingresado');
        }
    });
})

//Endpoints para Dishes
const dishes = require("./dish.js");

app.post('/api/dish/add', rutasProtegidas, function (request, response) {
    return users.getByNickName(request.body.requestedBy)
    .then(function (users) {
        if (users){
            if (users.toJSON().role==1){
                return dishes.addDish(request)
                .then(function (diches) {
                    if (dishes) {
                        response.send(dishes);
                    } else {
                        response.status(400).send('Error in insert new record');
                    }
                })
                .catch(err=>response.status(400).send(err.parent.sqlMessage));  
            }else{
                response.status(400).send('El usuario ' + request.body.requestedBy + ' no posee rol de administrador');
            }
        }else{
            response.status(400).send('No existe el usuario ' + request.body.requestedBy);
        }
    });       
        
});

app.put('/api/dish/update/:id', rutasProtegidas, function (request, response) {
    return users.getByNickName(request.body.requestedBy)
    .then(function (users) {
        if (users){
            if (users.toJSON().role==1){
                return dishes.updateDish(request)
                .then(function (dishes) {
                    if (dishes) {
                        response.status(200).send('El plato ' + request.params.id + ' ha sido actualizado con éxito')
                    } else {
                        response.status(400).send('Error in update new record');
                    }
                })    
                .catch(err=>response.status(400).send(err.parent.sqlMessage));  
            }else{
                response.status(400).send('El usuario ' + request.body.requestedBy + ' no posee rol de administrador');
            }
        }else{
            response.status(400).send('No existe el usuario ' + request.body.requestedBy);
        }
    });       
        
});

app.delete('/api/dish/delete/:id', rutasProtegidas, function (request, response) {
    return users.getByNickName(request.body.requestedBy)
    .then(function (users) {
        if (users){
            if (users.toJSON().role==1){
                return dishes.deleteDish(request)
                .then(function (dishes) {
                    if (dishes) {
                        response.status(200).send('El plato ' + request.params.id + ' ha sido eliminado con éxito')
                    } else {
                        response.status(400).send('Error in delete new record');
                    }
                })    
                .catch(err=>response.status(400).send(err.parent.sqlMessage));  
            }else{
                response.status(400).send('El usuario ' + request.body.requestedBy + ' no posee rol de administrador');
            }
        }else{
            response.status(400).send('No existe el usuario ' + request.body.requestedBy);
        }
    });       
        
});
app.get('/api/dish/getAll', rutasProtegidas, (request, response) => {
    return dishes.getAllDishes()
    .then(function (dishes) {
        if (dishes) {
            response.send(dishes);
            
        } else {
            response.status(400).send('Error');
        }
    });
})
app.get('/api/dish/getById/:id', rutasProtegidas, (request, response)=>{
    return dishes.getById(request)
    .then(function (dishes) {
        if (dishes) {
            response.send(dishes);
        } else {
            response.status(400).send('Error');
        }
    });
})

//Endpoints para Orders
const orders = require("./order.js");
const orders_dishes = require("./orders_dishes.js");


app.post('/api/order/add', rutasProtegidas, function (request, response) {
    return orders.addOrder(request)
    .then(function (orders) {
        if (orders) {
            request.body.dishes.forEach(element => {
                return dishes.getById(element.id_dish)  
                .then(function(dishes){
                    if (dishes){                                 
                        return orders_dishes.addOrderDish(element, orders.toJSON().id)
                        .then(function(orders_dishes){
                            response.send(orders);
                        })                                                          
                    }else{
                        response.status(400).send('No existe un plato con ese id' + element.id_dish);
                    }
                    
                });   
            });
        
        } else {
            response.status(400).send('Error in insert new record');
        }
    })
    .catch(err=>response.status(400).send(err.parent.sqlMessage));      
        
});

app.put('/api/order/update', rutasProtegidas, function (request, response) {
    return users.getByNickName(request.body.requestedBy)
    .then(function (users) {
        if (users){
            if (users.toJSON().role==1){
                return orders.updateOrder(request)
                .then(function (orders) {
                    if (orders) {
                        response.status(200).send('La orden ' + request.body.id + ' ha sido actualizada con éxito')
                    } else {
                        response.status(400).send('Error in update new record');
                    }
                })   
                .catch(err=>response.status(400).send(err.parent.sqlMessage));  
            }else{
                response.status(400).send('El usuario ' + request.body.requestedBy + ' no posee rol de administrador');
            }
        }else{
            response.status(400).send('No existe el usuario ' + request.body.requestedBy);
        }
    });       
        
});
app.get('/api/order/getMaxId', rutasProtegidas, (request, response) => {
    return users.getByNickName(request.body.requestedBy)
    .then(function (users) {
        if (users){
            if (users.toJSON().role==1){
                const orderList = orders.getAllOrders();
                orderList.forEach(order => {
                    if( order.id > max ) {
                      max = order.id;
                    }
                });
                console.log(max);
            }else{
                response.status(400).send('El usuario ' + request.body.requestedBy + ' no posee rol de administrador');
            }
        }else{
            response.status(400).send('No existe el usuario ' + request.body.requestedBy);
        }
    });       
        
});
app.get('/api/order/getAll', rutasProtegidas, (request, response) => {
    return users.getByNickName(request.body.requestedBy)
    .then(function (users) {
        if (users){
            if (users.toJSON().role==1){
                return orders.getAllOrders()
                .then(function (orders) {
                    if (orders) {
                        response.send(orders);
                        
                    } else {
                        response.status(400).send('Error');
                    }
                })   
                .catch(err=>response.status(400).send(err.parent.sqlMessage));  
            }else{
                response.status(400).send('El usuario ' + request.body.requestedBy + ' no posee rol de administrador');
            }
        }else{
            response.status(400).send('No existe el usuario ' + request.body.requestedBy);
        }
    });       
        
});
app.get('/api/order/getById/:id', rutasProtegidas, (request, response)=>{
    return users.getByNickName(request.body.requestedBy)
    .then(function (users) {
        if (users){
            if (users.toJSON().role==1){
                return orders.getById(request)
                .then(function (orders) {
                    if (orders) {
                        response.send(orders);
                    } else {
                        response.status(400).send('Error');
                    }
                })   
                .catch(err=>response.status(400).send(err.parent.sqlMessage));  
            }else{
                response.status(400).send('El usuario ' + request.body.requestedBy + ' no posee rol de administrador');
            }
        }else{
            response.status(400).send('No existe el usuario ' + request.body.requestedBy);
        }
    });       
        
});

app.listen(port, () => {
    console.log(`API REST corriendo en http://localhost:${port}`)
})

app.get('/', function(req, res) {
    res.send('Proyecto Delilah Resto');
});