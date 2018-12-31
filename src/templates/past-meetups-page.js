import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import isBefore from "date-fns/is_before";
import ReactMarkdown from "react-markdown";

import "../styles/past-meetups-page.scss";
import HTMLContent from "../components/Content";
import Layout from "../components/Layout";
import MeetupTemplate from "./meetup";

export const PastMeetupsPageTemplate = ({
  title,
  content,
  meetups = null,
  bodyIsMarkdown = false,
}) => {
  return (
    <article className="pastMeetups">
      <div className="pastMeetups-container">
        <h1 className="pastMeetups-title">{title}</h1>
        {bodyIsMarkdown ? (
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
          ))}
      </div>
    </article>
  );
};

PastMeetupsPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  meetups: PropTypes.array,
};

const PastMeetupsPage = ({ data, location }) => {
  const { markdownRemark: page } = data;
  const { pathname: currentPage } = location;
  const {
    frontmatter: {
      seo: { title: seoTitle, description: seoDescription, browserTitle },
    },
  } = page;
  let meetups = data.meetupData.edges;

  // Find all the meetups that occured in the past
  meetups = meetups.filter(meetup => {
    return isBefore(meetup.node.frontmatter.rawDate, new Date()) && meetup;
  });

  return (
    <Layout footerData={data.footerData} navbarData={data.navbarData} currentPage={currentPage}>
      <Helmet>
        <meta name="title" content={seoTitle} />
        <meta name="description" content={seoDescription} />
        <title>{browserTitle}</title>
      </Helmet>
      <PastMeetupsPageTemplate
        title={page.frontmatter.title}
        content={page.html}
        meetups={meetups}
      />
    </Layout>
  );
};

PastMeetupsPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default PastMeetupsPage;

export const pastMeetupsPageQuery = graphql`
  query PastMeetupsPage($id: String!) {
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
    ...MeetupFragment
  }
`;
