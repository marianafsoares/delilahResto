const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3001

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

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

    return dishes.addDish(request)
    .then(function (diches) {
        if (dishes) {
            response.send(dishes);
        } else {
            response.status(400).send('Error in insert new record');
        }
    })
    .catch(err=>response.status(400).send(err.parent.sqlMessage));      
        
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

app.post('/api/order/add', function (request, response) {

    return orders.addOrder(request)
    .then(function (orders) {
        if (orders) {
            response.send(orders);
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