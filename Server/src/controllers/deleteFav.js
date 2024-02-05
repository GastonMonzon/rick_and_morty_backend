const { Favorite } = require('../DB_connection');

async function deleteFav(request, response) {
  try {
    const { id } = request.params;
    await Favorite.destroy({ where: { id } });
    const favorites = await Favorite.findAll();
    response.json(favorites);
  } catch (error) {
    response.status(500).send(error.message);
  }
}

module.exports = deleteFav;