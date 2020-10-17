function getArticleSlug(base) {
  return "/posts/" + base
}

function getProductSlug(base) {
  return "/products/" + base
}

module.exports.getArticleSlug = getArticleSlug
module.exports.getProductSlug = getProductSlug
