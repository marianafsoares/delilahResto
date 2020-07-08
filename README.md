# delilahResto

Pasos para la configuracion de la base de datos
1 - Dentro del archivo create_DataBase.sql estan los pasos para crear un usuario, asignarle permisos y crear la base de datos
2 - Se debe importar la estructura de la base de datos con el archivo delilah.sql

Pasos para la configuracion del servidor
1 - Instalar nodeJs
2 - Descargamos el repo por ejemplo c:/delilahResto
3 - Desde consola o con visualStudio en la terminal nos movemos hacia esa carpeta. cd C:/delilahResto y ejecutas npm start
4 - Luego comenzamos a probar los endpoints que estan en el postamCollection. Para validar uso de token hay que pegarle al endpoint authenticate
5 - Se debe adjuntar en el header el acces-token para todos los metodos excepto el de addUser (que no lo requiere)