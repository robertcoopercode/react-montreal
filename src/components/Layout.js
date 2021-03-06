import React from "react";
import Helmet from "react-helmet";
import { graphql, StaticQuery } from "gatsby";

import "../styles/generic.scss";
import "../styles/reset.scss";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

const TemplateWrapper = ({ seo = { title: null, description: null, image: null, browserTitle: null}, currentPage = null,  children }) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            siteUrl
          }
        }
        seoData: allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "seo" } } }) {
          edges {
            node {
              frontmatter {
                image
                siteTitle
                siteDescription
              }
            }
          }
        }
        footerData: allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "footer" } } }) {
          edges {
            node {
              id
              frontmatter {
                icon {
                  image
                  imageAlt
                }
                socialLinks {
                  image
                  imageAlt
                  label
                  linkURL
                }
              }
            }
          }
        }
        navbarData: allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "navbar" } } }) {
          edges {
            node {
              id
              frontmatter {
                menuItems {
                  label
                  linkType
                  linkURL
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      let imageURL;
      if (seo.image) {
        imageURL = data.site.siteMetadata.siteUrl + seo.image;
      } else {
        imageURL = data.site.siteMetadata.siteUrl + data.seoData.edges[0].node.frontmatter.image;
      }

      return (
        <div>
          <Helmet>
            <html lang="en" />
            <title>{seo.browserTitle || data.seoData.edges[0].node.frontmatter.siteTitle}</title>
            <meta name="description" content={seo.description || data.site.siteMetadata.description} />

            {/* Twitter Card data */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@letsreactio" />
            <meta name="twitter:title" content={seo.title || data.seoData.edges[0].node.frontmatter.siteTitle} />
            <meta name="twitter:description" content={seo.description || data.seoData.edges[0].node.frontmatter.siteDescription} />
            <meta name="twitter:image" content={imageURL} />

            <meta property="og:title" content={seo.title || data.seoData.edges[0].node.frontmatter.siteTitle} />
            <meta property="og:image" content={imageURL} />
            <meta property="og:description" content={seo.description || data.seoData.edges[0].node.frontmatter.siteDescription} /> 
            <meta property="og:site_name" content={data.seoData.edges[0].node.frontmatter.siteTitle} />
          </Helmet>
          <Navbar data={data.navbarData} currentPage={currentPage} />
          <main>{children}</main>
          <Footer data={data.footerData} />
        </div>
      );
    }}
  >

  </StaticQuery>
);

export default TemplateWrapper;
