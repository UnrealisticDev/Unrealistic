function getPostSlug(base) {
  return "/posts/" + base
}

function getProductSlug(base) {
  return "/products/" + base
}

module.exports.getPostSlug = getPostSlug
module.exports.getProductSlug = getProductSlug
