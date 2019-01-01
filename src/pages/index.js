import PropTypes from "prop-types";
import React from "react";
import isAfter from "date-fns/is_after";
import isBefore from "date-fns/is_before";
import { graphql } from "gatsby";

import "../styles/home.scss";
import CustomLink from "../components/CustomLink";
import Layout from "../components/Layout";
import Meetup from "../templates/meetup";

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
            <CustomLink
              linkType={home.headerButton.linkType}
              linkURL={home.headerButton.linkURL}
              className="header-link"
            >
              {home.headerButton.label}
            </CustomLink>
          </div>
        </div>
      </section>
      <section className="upcomingMeetup  section">
        <div className="upcomingMeetup-container  container">
          <h2 className="upcomingMeetup-title  home-sectionTitle">{home.upcomingMeetupHeading}</h2>
          {upcomingMeetup ? (
            <>
              <Meetup meetup={upcomingMeetup} />
              <CustomLink
                linkType={home.upcomingMeetupCTA.linkType}
                linkURL={home.upcomingMeetupCTA.linkURL}
                className="upcomingMeetup-link"
              >
                {home.upcomingMeetupCTA.label}
              </CustomLink>
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
              <h2 className="recentMeetups-title  home-sectionTitle">{home.recentMeetupHeading}</h2>
              {recentMeetups.map(meetup => (
                <Meetup key={meetup.title} className="recentMeetups-meetup" meetup={meetup} />
              ))}
            </div>
            <CustomLink
              linkType='external'
              linkURL={home.recentMeetupCTA.linkURL}
              className="recentMeetups-link"
            >
              {home.recentMeetupCTA.label}
            </CustomLink>
          </section>
        )
      }
    </div>
  );
};

class HomePage extends React.Component {
  render() {
    const { data, location: { pathname: currentPage } } = this.props;
    const { frontmatter: home } = data.homePageData.edges[0].node;
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
      <Layout currentPage={currentPage} seo={home.seo}>
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
              linkType
              linkURL
            }
            upcomingMeetupHeading
            noUpcomingMeetupText
            upcomingMeetupCTA {
              label
              linkType
              linkURL
            }
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
            recentMeetupHeading
            recentMeetupCTA {
              label
              linkURL
            }
            seo {
              browserTitle
              title
              description
              image
            }
          }
        }
      }
    }
  }
`;
