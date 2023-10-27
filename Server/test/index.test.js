const app = require('../src/app');
const session = require('supertest');
const agent = session(app);

describe('Test de RUTAS', () => {
    describe('GET /rickandmorty/character/:id', () => {
        it('Responde con status: 200', async () => {
            const response = await agent.get('/rickandmorty/character/1');
            expect(response.statusCode).toBe(200);
        });
        it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async () => {
            const response = await agent.get('/rickandmorty/character/1');
            const props = ["id", "name", "species", "gender", "status", "origin", "image"];
            props.forEach(prop => {
                expect(response.body).toHaveProperty(prop);
            })
        });
        it('Si hay un error responde con status: 500', async () => {
            const response = await agent.get('/rickandmorty/character/id');
            expect(response.statusCode).toBe(500);
        });
    });
    describe('GET /rickandmorty/login', () => {
        it('Debería devolver un json access: true si se envía la información de login correcta', async () => {
            const response = await agent.get('/rickandmorty/login?email=gastonmonzon3@gmail.com&password=123456');
            expect(response.body).toEqual({ access: true });
        });
        it('Debería devolver un json access: false si se envía la información de login incorrecta', async () => {
            const response = await agent.get('/rickandmorty/login?email=email@incorrecto.com&password=987654');
            expect(response.body).toEqual({ access: false });
        });
    });
    describe('POST /rickandmorty/fav', () => {
        it('Debería devolver un arreglo que contenga lo enviado por body', async () => {
            const character = {
                id: 900,
                name: 'name',
                status: 'Alive',
                gender: 'unknown',
                species: 'Alien',
                origin: { name: 'Earth' },
                image: 'image.jpg'
            }
            const response = await agent.post('/rickandmorty/fav').send(character);
            expect(Array.isArray(response.body)).toBeTruthy();
            expect(response.body).toContainEqual(character);
        });
        it('Debería devolver un arreglo que incluya el elemento enviado previamente', async () => {
            const character = {
                id: 1000,
                name: 'you',
                status: 'Alive',
                gender: 'unknown',
                species: 'Alien',
                origin: { name: 'Earth' },
                image: 'image.jpg'
            }
            const response = await agent.post('/rickandmorty/fav').send(character);
            expect(response.body.length).toEqual(2);
        });
    });
    describe('DELETE /rickandmorty/fav/:id', () => {
        it('Debería devolver un arreglo con los elementos previos sin modificar si se envía un ID inválido', async () => {
            const response = await agent.delete('/rickandmorty/fav/id');
            expect(response.body.length).toEqual(2);
        });
        it('Debería eliminar correctamente al personaje si se envía un ID válido', async () => {
            const response = await agent.delete('/rickandmorty/fav/1000');
            expect(response.body.length).toEqual(1);
        });
    });
});
