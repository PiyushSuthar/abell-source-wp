const fetch = require('node-fetch')

/**
 * Executes before build. Access to createContent function makes it ideal for source plugins.
 * @param {import('abell').ProgramInfo} programInfo
 * @param {object} options
 * @param {Function} options.createContent
 */
async function beforeBuild(programInfo, { createContent }) {
  try {
    const url = new URL(programInfo.abellConfig.wp.url).hostname
    const articles = await fetch(`https://${url}/wp-json/wp/v2/posts?per_page=${programInfo.abellConfig.wp.articleLimit || 6}&page=1`).then(res => res.json())
    // slug, title, content, createdAt, modifiedAt are required values
    articles.map(article => {
      const sourceNode = {
        slug: article.slug,
        title: article.title.rendered,
        content: article.content.rendered,
        createdAt: new Date(article.date),
        modifiedAt: new Date(article.modified),
        contentType: 'html',
        description: article.excerpt.rendered
      };
      createContent(sourceNode);
    })
  } catch (err) {
    console.error(err);
  }
}


module.exports = { beforeBuild }