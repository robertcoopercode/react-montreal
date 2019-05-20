import Helmet from "react-helmet";
import PropTypes from "prop-types";
import React from "react";
import ReactMarkdown from "react-markdown";
import { graphql } from "gatsby";

import "../styles/sponsors-page.scss";
import HTMLContent from "../components/Content";
import Layout from "../components/Layout";

export const SponsorsPageTemplate = ({
  data,
  content,
  bodyIsMarkdown = false,
}) => {
  return (
    <article className="sponsorsPage">
      <div className="sponsorsPage-container">
        <h1 className="sponsorsPage-title">{data.title}</h1>
        {bodyIsMarkdown ? (
          <ReactMarkdown className="sponsorsPage-description" source={content} />
        ) : (
          <HTMLContent className="sponsorsPage-description" content={content} />
        )}
        <div className="sponsorsPage-ctaContainer">
          <span className="sponsorsPage-ctaText">{data.callToAction.text}</span>
          <a className="sponsorsPage-ctaLink" href={data.callToAction.link}>{data.callToAction.label}</a>
        </div>
        {data.sponsorsList && (
          <div className="sponsorsPage-sponsors">
            {data.sponsorsList.map((sponsor) => (
              <a key={sponsor.name} className="sponsorsPage-sponsor" href={sponsor.link} target="_blank" rel="noopener">
                <img className="sponsorsPage-sponsorImage" src={sponsor.logo} alt={sponsor.name} />
                <span className="sponsorsPage-sponsorName">{sponsor.name}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

SponsorsPageTemplate.propTypes = {
  content: PropTypes.string,
  meetups: PropTypes.array,
};

const SponsorsPage = ({ data, location }) => {
  const { markdownRemark: page } = data;
  const { pathname: currentPage } = location;
  const {
    frontmatter: {
      seo
    },
  } = page;

  return (
    <Layout currentPage={currentPage} seo={seo}>
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
          image
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
  }
`;
