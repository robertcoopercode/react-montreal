import React from "react";
import "./styles.scss";

export const FooterTemplate = ({ data }) => {
  const { icon, socialLinks } = data;

  return (
    <nav className="footer">
      <div className="footer-container  container">
        {socialLinks.length > 0 && (
          <ul className="footer-socialMenu">
            {socialLinks.map(socialLink => (
              <li key={socialLink.linkURL} className="footer-socialMenuItem">
                <a
                  className="footer-socialLink"
                  href={socialLink.linkURL}
                  target="_blank"
                  rel="noopener"
                >
                  <img
                    className="footer-socialLinkIcon"
                    src={socialLink.image}
                    alt={socialLink.imageAlt}
                  />
                  {socialLink.label}
                </a>
              </li>
            ))}
          </ul>
        )}
        <div className="footer-bottom">
          <img className="footer-bottomIcon" src={icon.image} alt={icon.imageAlt} />
          <span className="footer-bottomText">Website proudly built with React.js</span>
        </div>
      </div>
    </nav>
  );
};

const Footer = props => {
  if (!props.data) {
    return null;
  }
  const data = props.data.edges[0].node.frontmatter;
  return <FooterTemplate data={data} />;
};

export { Footer };
