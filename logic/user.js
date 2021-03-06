// DEPENDENCIES
const db = require("../util/db.js");

// REF
const ref = db.refs.userRef;

// METHODS
function getById(id) {
  return db.getById(ref, id);
}

function createByManualId(id, fieldToVal) {
  return db.createByAutoId(ref, {
    id: fieldToVal.id,
    name: fieldToVal.name,
    username: fieldToVal.username,
    password: fieldToVal.password,
    email: fieldToVal.email,
    imageUrl: fieldToVal.imageUrl,
    eventIds: fieldToVal.eventIds
  });
}

function favorite(id, favId) {
  return db.transaction(ref, id, "favoriteIds", function(favoriteIds) {
    favoriteIds = favoriteIds || [];
    favoriteIds.push(favId);
    return favoriteIds;
  });
}

function unFavorite(id, favId) {
  return db.transaction(ref, id, "favoriteIds", function(favoriteIds) {
    favoriteIds = favoriteIds || [];
    var index = favoriteIds.indexOf(favId);
    favoriteIds.splice(index, 1);
    return favoriteIds;
  });
}

// EXPORTS
module.exports.getById = getById;
module.exports.createByManualId = createByManualId;
module.exports.favorite = favorite;
module.exports.unFavorite = unFavorite;
module.exports.ref = ref;
