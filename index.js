const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const config = require('./config')

const app = express()
const port = process.env.PORT || 3001

app.set('llave', config.llave);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const users = require("./user.js");

/*app.post('/api/autenticar', (req, res) => {
    return users.getByNickName(req.body.nickName)
    .then(function (users) {
        if (users){
            if (users.toJSON().password==req.body.password){
                const payload = {
                    check:  true
                   };
                   const token = jwt.sign(payload, app.get('llave'), {
                    expiresIn: 1440
                   });
                   res.json({
                    mensaje: 'Autenticación correcta',
                    token: token
                   });
            }else{
                res.status(400).send('La contraseña que ha ingresado es incorrecta');
            }
        }else{
            res.status(400).send('No existe el usuario ' + req.body.nickName);
        }
    });
})

app.use((req, res, next) => {
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
 });*/

//Endpoints para Roles
const roles = require("./role.js");

app.get('/api/role/getAll', (request, response) => {
    return roles.getAllRoles()
    .then(function (roles) {
        if (roles) {
            response.send(roles);
            
        } else {
            response.status(400).send('Error');
        }
    });
})
app.get('/api/role/getById/:id', (request, response)=>{
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
app.put('/api/user/update/:id', function (request, response) {
    return users.updateUser(request)
    .then(function (users) {
        if (users) {
            response.status(200).send('El usuario ' + request.params.id + ' ha sido actualizado con éxito')
        } else {
            response.status(400).send('Error in update new record');
        }
    });    
});
app.delete('/api/user/delete/:id', function (request, response) {
    return users.deleteUser(request)
    .then(function (users) {
        if (users) {
            response.status(200).send('El usuario ' + request.params.id + ' ha sido eliminado con éxito')
        } else {
            response.status(400).send('Error in delete new record');
        }
    });    
});
app.get('/api/user/getAll', (request, response) => {
    return users.getAllUsers()
    .then(function (users) {
        if (users) {
            response.send(users);
            
        } else {
            response.status(400).send('Error');
        }
    });
})
app.get('/api/user/getById/:id', (request, response)=>{
    return users.getById(request)
    .then(function (users) {
        if (users) {
            response.send(users);
        } else {
            response.status(400).send('Error');
        }
    });
})
app.get('/api/user/getByNickName/:nickName', (request, response)=>{
    return users.getByNickName(request)
    .then(function (users) {
        if (users) {
            response.send(users);
        } else {
            response.status(400).send('Error');
        }
    });
})

//Endpoints para Dishes
const dishes = require("./dish.js");

app.post('/api/dish/add', function (request, response) {
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

app.put('/api/dish/update/:id', function (request, response) {
    return dishes.updateDish(request)
    .then(function (dishes) {
        if (dishes) {
            response.status(200).send('El plato ' + request.params.id + ' ha sido actualizado con éxito')
        } else {
            response.status(400).send('Error in update new record');
        }
    });    
});
app.delete('/api/dish/delete/:id', function (request, response) {
    return dishes.deleteDish(request)
    .then(function (dishes) {
        if (dishes) {
            response.status(200).send('El plato ' + request.params.id + ' ha sido eliminado con éxito')
        } else {
            response.status(400).send('Error in delete new record');
        }
    });    
});
app.get('/api/dishes/getAll', (request, response) => {
    return dishes.getAllDishes()
    .then(function (dishes) {
        if (dishes) {
            response.send(dishes);
            
        } else {
            response.status(400).send('Error');
        }
    });
})
app.get('/api/dish/getById/:id', (request, response)=>{
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

app.get('/api/order/getMaxId', function (request, response) {
    let id = orders.getMaxId();
    console.log(id);
    /*.then(function(dishes){        
        response.send(orders);
        console.log(orders);
    })
    .catch(err=>response.status(400).send(err.parent.sqlMessage));*/
    
});

app.post('/api/order/add', function (request, response) {
    return orders.addOrder(request)
    .then(function (orders) {
        if (orders) {
            request.body.dishes.forEach(element => {
                return dishes.getById(element.id_dish)          
                .then(function(dishes){
                    if (dishes){
                        return orders_dishes.addOrderDish(element)
                        .then(function(orders_dishes){
                            response.send(orders_dishes);
                        })
                        .catch(err=>response.status(400).send(err.parent.sqlMessage));                         
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

app.put('/api/order/update/:id', function (request, response) {
    return orders.updateOrder(request)
    .then(function (orders) {
        if (orders) {
            response.status(200).send('La orden ' + request.params.id + ' ha sido actualizada con éxito')
        } else {
            response.status(400).send('Error in update new record');
        }
    });    
});
app.delete('/api/order/delete/:id', function (request, response) {
    return orders.deleteOrder(request)
    .then(function (orders) {
        if (orders) {
            response.status(200).send('La orden ' + request.params.id + ' ha sido eliminada con éxito')
        } else {
            response.status(400).send('Error in delete new record');
        }
    });    
});
app.get('/api/dishes/getAll', (request, response) => {
    return dishes.getAllDishes()
    .then(function (dishes) {
        if (dishes) {
            response.send(dishes);
            
        } else {
            response.status(400).send('Error');
        }
    });
})
app.get('/api/dish/getById/:id', (request, response)=>{
    return dishes.getById(request)
    .then(function (dishes) {
        if (dishes) {
            response.send(dishes);
        } else {
            response.status(400).send('Error');
        }
    });
})


app.listen(port, () => {
    console.log(`API REST corriendo en http://localhost:${port}`)
})