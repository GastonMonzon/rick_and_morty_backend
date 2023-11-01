/* 
const express = require('express');
const { router } = require('./routes/')
const server = express();
 */
const { conn } = require('./DB_connection');
const server = require('./app');
const PORT = 3001;

server.listen(PORT, () => {
  console.log('Server raised in port: ' + PORT);
  conn.sync({ alter: true });
});

/* 
server.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Credentials', 'true');
  response.header(
     'Access-Control-Allow-Headers',
     'Origin, X-Requested-With, Content-Type, Accept'
  );
  response.header(
     'Access-Control-Allow-Methods',
     'GET, POST, OPTIONS, PUT, DELETE'
  );
  next();
});

server.use(express.json()); // Middleware para parsear el cuerpo de la solicitud como JSON

server.use('/rickandmorty', router); // Reemplaza '/rickandmorty' con la ruta base correcta para el router
 */
/* 
const http = require('http');
const data = require('./utils/data');
const { getCharById } = require('./controllers/getCharById.js')

const server = http.createServer((request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*'); // Configura el encabezado para permitir solicitudes desde cualquier dominio
  
    if (request.url.includes('/rickandmorty/character')) {
      const id = request.url.split('/').at(-1); // Obtiene el último segmento de la URL como el ID del personaje
      const character = data.find((item) => item.id === Number(id)); // Busca el personaje en el archivo data.js
      
      getCharById(response, id);
  
      // res.setHeader('Content-Type', 'application/json');
      // res.end(JSON.stringify(character)); // Envía la respuesta como JSON con el personaje encontrado
    } else {
      response.statusCode = 404; // Si la URL no coincide con el patrón esperado, responde con un código de estado 404
      response.end('Not Found');
    }
  });
  
  server.listen(3001, () => {
    console.log('Server is running on port 3001');
  });
 */