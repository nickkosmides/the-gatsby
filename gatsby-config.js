require("dotenv").config({
  path: ".env",
});

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  developMiddleware: app => {
    app.use(
      "/graphql",
      proxy({
        target: "https://fantastic-pear.flywheelsites.com",
        changeOrigin: true,
        pathRewrite: {
          "^/graphql": "https://fantastic-pear.flywheelsites.com/graphql"
        },
      })
    )
  },
  siteMetadata: {
    title: `The Gatsby Garage`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    {
      resolve: "gatsby-plugin-apollo",
      options: {
        uri: process.env.WPGRAPHQL_URL,
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-postcss",
    `gatsby-transformer-sharp`, // Needed for dynamic images,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: process.env.WPGRAPHQL_URL,
        auth: {
          htaccess: {
            username: "flywheel",
            password: "equal-idea"
          }
        }
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "static/favicon.png",
      },
    },
  ],
};
