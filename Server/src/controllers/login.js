// const users = require('../utils/users');
const { User } = require('../DB_connection');

async function login(request, response) {
    try {
        const { email, password } = request.query;
        if (!email || !password) {
            return response.status(400).send('Faltan datos');
        }
        const foundUser = await User.findOne({ where: { email } });
        if (!foundUser) {
            return response.status(404).send('Usuario no encontrado');
        }
        if (foundUser.password !== password) {
            return response.status(403).send('Contraseña incorrecta');
        }
        return response.json({ access: true });
    } catch (error) {
        response.status(500).send(error.message);
    }
}

module.exports = login;

/* 
async function login(request, response) {
    const { email, password } = request.query;
    const foundUser = users.find(
        (user) => user.email === email && user.password === password);
    if (foundUser) {
        return response.status(200).json({ 'access': true });
    } else {
        return response.status(404).json({ 'access': false });
    }
}
 */