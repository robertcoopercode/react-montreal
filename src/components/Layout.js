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
    render={data => (
      <div>
        <Helmet>
          <html lang="en" />
          <title>{seo.browserTitle}</title>
          <meta name="description" content={seo.description} />

          {/* Twitter Card data */}
          {/* Image should be 1600 x 900 px */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@letsreactio" />
          <meta name="twitter:title" content={seo.title} />
          <meta name="twitter:description" content={seo.description} />
          <meta name="twitter:image" content={seo.image || 'defaultImage'} />

          <meta property="og:title" content={seo.title} />
          {/* <meta property="og:url" content="http://www.example.com/" /> */}
          <meta property="og:image" content={seo.image || 'defaultImage'} />
          <meta property="og:description" content={seo.description} /> 
          <meta property="og:site_name" content="Site Name, i.e. Moz" />
        </Helmet>
        <Navbar data={data.navbarData} currentPage={currentPage} />
        <main>{children}</main>
        <Footer data={data.footerData} />
      </div>
    )}
  >

  </StaticQuery>
);

export default TemplateWrapper;
