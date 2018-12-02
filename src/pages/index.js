import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import isAfter from "date-fns/is_after";
import isBefore from "date-fns/is_before";
import { Link } from 'gatsby';

import Layout from "../components/Layout";
import Meetup from "../templates/meetup";
import CustomLink from "../components/CustomLink";
import "../styles/home.scss";

export const HomePageTemplate = ({ home, upcomingMeetup = null, recentMeetups = [] }) => {
  return (
    <div className="home">
      <section className="header">
        <div className="header-container  container">
          {home.headerImage && <img className="header-image" src={home.headerImage.image} alt={home.headerImage.imageAlt} />}
          <div className="header-detailsContainer">
            <h3 className="header-tagline">
              {home.title}
            </h3>
            <a className="header-link" href={home.headerButton.link}>
              {home.headerButton.label}
            </a>
          </div>
        </div>
      </section>
      <section className="upcomingMeetup  section">
        <div className="upcomingMeetup-container  container">
          <h2 className="upcomingMeetup-title  home-sectionTitle">{home.upcomingMeetupHeading}</h2>
          {upcomingMeetup ? (
            <>
              <Meetup meetup={upcomingMeetup} />
              <a className="upcomingMeetup-link" href="#">Tell us you're attending!</a>
            </>
          ) : (
            <p className="upcomingMeetup-detail">{home.noUpcomingMeetupText}</p>
          )}
        </div>
      </section>
      <section className="ctaBlock">
        <CustomLink
          linkType={home.callToActions.firstCTA.linkType}
          linkURL={home.callToActions.firstCTA.linkURL}
          className="ctaBlock-pattern  ctaBlock-pattern--first"
        >
          <div className="ctaBlock-cta">
            <span className="ctaBlock-ctaHeading">{home.callToActions.firstCTA.heading}</span>
            <p className="ctaBlock-ctaDescription">{home.callToActions.firstCTA.subHeading}</p>
          </div>
        </CustomLink>
        <CustomLink
          linkType={home.callToActions.secondCTA.linkType}
          linkURL={home.callToActions.secondCTA.linkURL}
          className="ctaBlock-pattern  ctaBlock-pattern--second"
        >
          <div className="ctaBlock-cta">
            <span className="ctaBlock-ctaHeading">{home.callToActions.secondCTA.heading}</span>
            <p className="ctaBlock-ctaDescription">{home.callToActions.secondCTA.subHeading}</p>
          </div>
        </CustomLink>
      </section>
      {
        recentMeetups && (
          <section className="recentMeetups  section">
            <div className="recentMeetups-container  container">
              <h2 className="recentMeetups-title  home-sectionTitle">Recent Meetups</h2>
              {recentMeetups.map(meetup => (
                <Meetup key={meetup.title} className="recentMeetups-meetup" meetup={meetup} />
              ))}
            </div>
            <Link className="recentMeetups-link" to="/meetups">View all meetups</Link>
          </section>
        )
      }
    </div>
  );
};

class HomePage extends React.Component {
  render() {
    const { data } = this.props;
    const {
      data: { footerData, navbarData },
    } = this.props;
    const { frontmatter: home } = data.homePageData.edges[0].node;
    const {
      seo: { title: seoTitle, description: seoDescription, browserTitle },
    } = home;
    let upcomingMeetup = null;
    let recentMeetups = [];
    // Find the next meetup that is closest to today
    data.meetupData.edges.every(item => {
      const { frontmatter: meetup } = item.node;
      if (isAfter(meetup.rawDate, new Date())) {
        upcomingMeetup = meetup;
        return true;
      } else if (isBefore(meetup.rawDate, new Date()) && recentMeetups.length < 3) {
        recentMeetups.push(meetup);
        return true;
      } else {
        return false;
      }
    });
    return (
      <Layout footerData={footerData} navbarData={navbarData}>
        <Helmet>
          <meta name="title" content={seoTitle} />
          <meta name="description" content={seoDescription} />
          <title>{browserTitle}</title>
        </Helmet>
        <HomePageTemplate home={home} upcomingMeetup={upcomingMeetup} recentMeetups={recentMeetups} />
      </Layout>
    );
  }
}

HomePage.propTypes = {
  data: PropTypes.shape({
    meetupData: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default HomePage;

export const pageQuery = graphql`
  query HomePageQuery {
    ...LayoutFragment
    ...MeetupFragment
    homePageData: allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "home-page" } } }) {
      edges {
        node {
          frontmatter {
            title
            headerImage {
              image
              imageAlt
            }
            headerButton {
              label
              link
            }
            upcomingMeetupHeading
            noUpcomingMeetupText
            callToActions {
              firstCTA {
                heading
                subHeading
                linkType
                linkURL
              }
              secondCTA {
                heading
                subHeading
                linkType
                linkURL
              }
            }
            seo {
              browserTitle
              title
              description
            }
          }
        }
      }
    }
  }
`;
