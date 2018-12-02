import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import ReactMarkdown from "react-markdown";

import Layout from "../components/Layout";
import HTMLContent from "../components/Content";
import "../styles/sponsors-page.scss";

export const SponsorsPageTemplate = ({
  data,
  content,
  bodyIsMarkdown = false,
}) => {
  return (
    <article className="sponsorsPage">
      <div className="container  sponsorsPage-container">
        <h1 className="sponsorsPage-title">{data.title}</h1>
        {bodyIsMarkdown ? (
          <ReactMarkdown className="sponsorsPage-description" source={content} />
        ) : (
          <HTMLContent className="sponsorsPage-description" content={content} />
        )}
        <div className="sponsorsPage-callToActionContainer">
          <span>{data.callToAction.text}</span>
          <a href={data.callToAction.link}>{data.callToAction.label}</a>
        </div>
        {data.sponsorsList && (
          <div className="sponsorsPage-sponsors">
            {data.sponsorsList.map((sponsor) => (
              <div>
                <img src={sponsor.logo} alt={sponsor.name} />
                <span>{sponsor.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

SponsorsPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  meetups: PropTypes.array,
};

const SponsorsPage = ({ data }) => {
  const { markdownRemark: page } = data;
  const {
    frontmatter: {
      seo: { title: seoTitle, description: seoDescription, browserTitle },
    },
  } = page;

  return (
    <Layout footerData={data.footerData} navbarData={data.navbarData}>
      <Helmet>
        <meta name="title" content={seoTitle} />
        <meta name="description" content={seoDescription} />
        <title>{browserTitle}</title>
      </Helmet>
      <SponsorsPageTemplate
        data={page.frontmatter}
        content={page.html}
      />
    </Layout>
  );
};

SponsorsPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default SponsorsPage;

export const sponsorsPageQuery = graphql`
  query SponsorsPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        seo {
          browserTitle
          title
          description
        }
        callToAction {
          label
          link
          text
        }
        sponsorsList {
          link
          logo
          name
        }
      }
    }
    ...LayoutFragment
  }
`;
