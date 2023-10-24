const users = require('../utils/users');

function login(request, response) {
    const { email, password } = request.query;

    const foundUser = users.find(
        (user) => user.email === email && user.password === password);

    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Users:', users);
    console.log(foundUser);

    if (foundUser) {
        return response.status(200).json({ 'access': true });
    } else {
        return response.status(404).json({ 'access': false });
    }
}

module.exports = { login };