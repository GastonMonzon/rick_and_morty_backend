let myFavorites = [];

function postFav(request, response) {
  const favoriteCharacter = request.body;
  myFavorites.push(favoriteCharacter);
  response.json(myFavorites);
}

function deleteFav(request, response) {
  const characterId = request.params.id;
  myFavorites = myFavorites.filter(character => character.id !== characterId);
  response.json(myFavorites);
}

module.exports = {
  postFav,
  deleteFav
};