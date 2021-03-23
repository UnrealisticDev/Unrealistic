function getPostSlug(slug) {
  return `/posts/${slug}`
}

function getProductSlug(slug) {
  return `/products/${slug}`
}

function getUSpecifierSlug(slug) {
  return `/glossary/${slug}`
}

module.exports.getPostSlug = getPostSlug
module.exports.getProductSlug = getProductSlug
module.exports.getUSpecifierSlug = getUSpecifierSlug
