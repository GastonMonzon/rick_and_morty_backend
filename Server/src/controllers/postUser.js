const { User } = require('..DB_connection');

async function postUser(request, response) {
    try {
        const { email, password } = request.body;
        if (!email || !password) {
            return response.status(400).send('Faltan datos');
        }
        const [ user, isCreated ] = await findOrCreate({
            where: { email }, // findOrCreate devuelve un objeto encontrado o creado y un booleado si se creó o no
        })
        response.status(201).json(user);
    } catch (error) {
        response.status(500).send(error.message);
    }
}

module.exports = postUser;