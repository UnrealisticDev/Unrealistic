function getArticleSlug(base) {
  return "/posts/" + base
}

function getProductSlug(base) {
  return "/products/" + base
}

module.exports.getPostSlug = getArticleSlug
module.exports.getProductSlug = getProductSlug
