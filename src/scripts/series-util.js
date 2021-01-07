function isPostInSeries(post, allSeries) {
    for (const {node} of allSeries.edges) {
        for (const srPost of node.posts) {
            if (srPost.id === post.id) {
                return true;
            }
        }
    }

    return false;
}

function getNonSerialPosts(allPosts, allSeries) {
    var outPosts = [];
    for (const {node} of allPosts.edges) {
        if (isPostInSeries(node, allSeries)) {
            outPosts.push(node);
        }
    }
    return outPosts;
}

module.exports = getNonSerialPosts;