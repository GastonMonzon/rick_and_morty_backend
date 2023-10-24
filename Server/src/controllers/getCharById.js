const axios = require("axios");
const URL = 'https://rickandmortyapi.com/api/character';

async function getCharById(request, response) {
    try {
        const { id } = request.params;
        const { data } = await axios(`${URL}/${id}`);
        if (data.id) {
            const character = {
                id,
                name: data.name,
                status: data.status,
                gender: data.gender,
                species: data.species,
                origin: data.origin.name,
                image: data.image
            };
            return response.status(200).json(character);
        } else {
            return response.status(404).send('Not found');
            // return response.status(404).json({ message: 'Not found' })
        }
    } catch (error) {
        return response.status(500).send(error.message)
        // return response.status(500).json({ message: error.message })
    };
}

module.exports = { getCharById };

/* 
const axios = require("axios");

function getCharById(response, id) {
    axios(`https://rickandmortyapi.com/api/character/${id}`)
        .then(({ data }) => {
            const character = {
                id,
                name: data.name,
                status: data.status,
                gender: data.gender,
                species: data.species,
                origin: data.origin.name,
                image: data.image
            };
            return response
                .writeHead(200, { "Content-type": "application/json" })
                .end(JSON.stringify(character));
        })
        .catch(error => {
            return response
                .writeHead(500, { "Content-type": "text/plain" })
                .end(error.message);
        });
}

module.exports = getCharById;
*/
