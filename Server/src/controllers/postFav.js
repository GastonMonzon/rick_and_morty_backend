const { Favorite } = require('../DB_connection');

async function postFav(request, response) {
    try {
      const { id, name, origin, status, image, species, gender } = request.body;
      if (!id || !name || !origin || !status || !image || !species || !gender) {
        return response.status(401).send('Faltan datos');
      }
      await Favorite.findOrCreate({
        where: { id, name, origin, status, image, species, gender }
      });
      const favorites = await Favorite.findAll();
      response.status(201).json(favorites);
    } catch (error) {
      response.status(500).send(error.message);
    }
  }

module.exports = postFav;