import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import isBefore from "date-fns/is_before";
import ReactMarkdown from "react-markdown";

import MeetupTemplate from "./meetup";
import Layout from "../components/Layout";
import HTMLContent from "../components/Content";
import "../styles/sponsors-page.scss";

export const SponsorsPageTemplate = ({
  title,
  content,
  bodyIsMarkdown = false,
}) => {
  return (
    <article className="sponsorsPage">
      <div className="container  sponsorsPage-container">
        <h1 className="sponsorsPage-title">{title}</h1>
        {/* {bodyIsMarkdown ? (
          <ReactMarkdown className="pastMeetups-description" source={content} />
        ) : (
          <HTMLContent className="pastMeetups-description" content={content} />
        )}
        {meetups &&
          meetups.map((meetup, index) => (
            <MeetupTemplate
              key={index}
              className="pastMeetups-meetup"
              meetup={meetup.node.frontmatter}
            />
          ))} */}
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
        title={page.frontmatter.title}
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
      }
    }
    ...LayoutFragment
  }
`;
