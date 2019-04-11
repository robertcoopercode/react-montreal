import React, { Component } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import format from 'date-fns/format';
import "../styles/meetup.scss";

import HeadshotPlaceholder from "../img/headshot-placeholder.svg";

class MeetupTemplate extends Component {
  render() {
    const convertTitleToSlug = (title) => {
      const lowercaseTitle = title.toLowerCase();
      const result = lowercaseTitle.replace(' ', '-');
  
      return result;
  }
    return (
      <section
        className={`meetup  ${this.props.className && this.props.className}`}
        id={convertTitleToSlug(this.props.meetup.title)}
        key={this.props.meetup.rawDate}
      >
        <h2 className="meetup-title">{this.props.meetup.title}</h2>
        <div className="meetup-meta">
          <p className="meetup-metaField  meetup-metaField--date">
            <span className="meetup-label">Date:</span> {format(this.props.meetup.rawDate, "MMMM Do YYYY @ h:mm A") }
          </p>
          <p className="meetup-metaField  meetup-metaField--location">
            <span className="meetup-label">Location:</span>&nbsp;
            <a className="meetup-metaFieldLink" href={this.props.meetup.location.mapsLink} target="_blank" rel="noopener noreferrer">{this.props.meetup.location.name}</a>
          </p>
        </div>
        <div className="meetup-presenters">
          {this.props.meetup.presenters.map(presenter => (
            <div className="meetup-presenter meetupUnit" key={presenter.presentationTitle}>
              <div className="meetup-presenterImageContainer  meetupUnit-imageContainer">
                <img
                  className="meetup-presenterImage  meetupUnit-image"
                  src={presenter.image ? presenter.image : HeadshotPlaceholder}
                  alt={presenter.image ? presenter.name : "Default headshot placeholder"}
                />
                <span className="meetup-presenterName  meetupUnit-name">{presenter.name}</span>
              </div>
              <div className="meetup-presenterInfo  meetupUnit-info">
                {presenter.presentationTitle && (
                  <h4 className="meetup-presenterTitle">{presenter.presentationTitle}</h4>
                )}
                <p className="meetup-presenterText  meetupUnit-text">{presenter.text}</p>
                <ul className="meetup-presenterLinks  meetupUnit-links">
                  {presenter.links &&
                    presenter.links.map((link, index) => (
                      <li key={index} className="meetup-presenterLinkItem  meetupUnit-linkItem">
                        <a className="meetup-presenterLink  meetupUnit-link" href={link.linkURL}>
                          {link.linkText}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        {this.props.meetup.sponsors && <h3 className="meetup-sponsorsTitle">Thanks to our Sponsors</h3>}
        <div className="meetup-sponsors">
          {this.props.meetup.sponsors && this.props.meetup.sponsors.map(sponsor => (
            <div className="meetup-sponsor  meetupUnit" key={sponsor.name}>
              <div className="meetupUnit-imageContainer">
                <img className="meetupUnit-image" src={sponsor.logo} alt={sponsor.name} />
                <h4 className="meetupUnit-name">{sponsor.name}</h4>
              </div>
              <div className="meetupUnit-info">
                <p className="meetupUnit-text">{sponsor.text}</p>
                <ul className="meetupUnit-links">
                  {sponsor.links && sponsor.links.map((link) => (
                    <li className="meetupUnit-linkItem" key={link.linkURL}>
                      <a className="meetupUnit-link" href={link.linkURL}>
                        {link.linkText}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

MeetupTemplate.propTypes = {
  meetup: PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string,
    presenters: PropTypes.array,
  }),
};

export const query = graphql`
  fragment MeetupFragment on Query {
    meetupData: allMarkdownRemark(
      filter: { frontmatter: { presenters: { elemMatch: { text: { ne: null } } } } }
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      edges {
        node {
          frontmatter {
            title
            rawDate: date
            meetupURL
            isUpcomingMeetup
            presenters {
              name
              image
              text
              presentationTitle
              links {
                linkText
                linkURL
              }
            }
            sponsors {
              logo
              name
              text
              links {
                linkText
                linkURL
              }
            }
            location {
              mapsLink
              name
            }
          }
        }
      }
    }
  }
`;

export default MeetupTemplate;
