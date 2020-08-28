/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Site details */
  siteMetadata: {
    siteUrl: `https://unrealistic.dev`,
    title: `Unrealistic`,
    tagline: `A place to learn about Unreal Engine 4, gamedev, and chasing your dreams.`,
    author: `Mowgl33`
  },
  plugins: [
    /* Page routing, metadata, SEO */
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-force-trailing-slashes`,
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://unrealistic.dev`
      }
    },
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-160708075-1"
      }
    },
    /* Content sourcing and transformation */
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `4z1i7rtd5bsh`,
        accessToken: `Xeqkswi8vvM5us2jEa7ESxU4MyAqyZQj5EHQ1SyzTe8`
      }
    },
    /* - Sharp (enables gatsby-image) */
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    /* - Remark (enables markdown support) */
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images-contentful`,
            options: {
              maxWidth: 590,
              showCaptions: `true`
            }
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: true,
              escapeEntities: {}
            }
          }
        ]
      }
    },
    /* - Site search */
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: `Y7ES67CX6H`,
        apiKey: `7f89d8a0c9168f15d2e36ef0b99087ff`,
        queries: require("./src/utils/algolia-queries")
      }
    },
    /* Hosting */
    `gatsby-plugin-netlify`,
    /* Progressive Web App (PWA) */
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Unrealistic.dev`,
        short_name: `Unrealistic`,
        start_url: `/`,
        background_color: `#f5f5f5`,
        theme_color: `#f5f5f5`,
        display: `standalone`,
        icon: `src/images/logo-maskable.png`
      }
    },
    `gatsby-plugin-offline`
  ]
};
