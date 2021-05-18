function getPostSlug(slug) {
  return `/posts/${slug}`
}

function getProductSlug(slug) {
  return `/products/${slug}`
}

function getShowcaseSlug(showcase) {
  return `/showcase/${showcase.title.toLowerCase().replace(' ', '-')}`;
}

function getUSpecifierSlug(slug) {
  return `/glossary/${slug}`
}

module.exports.getPostSlug = getPostSlug
module.exports.getProductSlug = getProductSlug
module.exports.getShowcaseSlug = getShowcaseSlug
module.exports.getUSpecifierSlug = getUSpecifierSlug
