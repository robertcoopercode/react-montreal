module.exports = {
  siteMetadata: {
    siteUrl: 'https://meetup.letsreact.io',
    title: 'React MTL',
    description: `React MTL is a meetup group in Montreal where React developers get together for presentations and to meet others in the community.`,
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/img`,
        name: "images",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [],
      },
    },
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: "./src/img/favicon.png",
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'React MTL',
        short_name: 'React MTL',
        start_url: '/',
        background_color: '#fff',
        theme_color: '#114fe6',
        display: 'standalone',
        icon: 'src/img/favicon.png',
      },
    },
    "gatsby-plugin-netlify", // make sure to keep it last in the array
  ],
};
