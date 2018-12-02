import React, { Component } from "react";
import PropTypes from "prop-types";
import "../styles/meetup.scss";

import HeadshotPlaceholder from "../img/headshot-placeholder.svg";

class MeetupTemplate extends Component {
  render() {
    return (
      <section
        className={`meetup  ${this.props.className && this.props.className}`}
        key={this.props.meetup.rawDate}
      >
        <h2 className="meetup-title">{this.props.meetup.title}</h2>
        <div className="meetup-meta">
          <p className="meetup-metaField  meetup-metaField--date">
            <span className="meetup-label">Date:</span> {this.props.meetup.formattedDate}
          </p>
          <p className="meetup-metaField  meetup-metaField--location">
            <span className="meetup-label">Location:</span> {this.props.meetup.location.name}
          </p>
        </div>
        <div className="meetup-presenters">
          {this.props.meetup.presenters.map(presenter => (
            <div className="meetup-presenter meetupUnit" key={presenter.name}>
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
        <h3 className="meetup-sponsorsTitle">Thanks to our Sponsors</h3>
        <div className="meetup-sponsors">
            <div className="meetup-sponsor  meetupUnit">
              <div className="meetupUnit-imageContainer">
                <img className="meetupUnit-image" src={HeadshotPlaceholder} alt={"Default headshot placeholder"} />
                <h4 className="meetupUnit-name">Shopify</h4>
              </div>
              <div className="meetupUnit-info">
                <p className="meetupUnit-text">Thanks to Shopify for sponsoring the venue location.</p>
                <ul className="meetupUnit-links">
                  <li className="meetupUnit-linkItem">
                    <a className="meetupUnit-link" href="#">
                      Work at Shopify
                    </a>
                  </li>
                </ul>
              </div>
            </div>
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

export default MeetupTemplate;
