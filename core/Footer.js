/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    const docsUrl = this.props.config.docsUrl;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    return `${baseUrl}${docsPart}${langPart}${doc}`;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? `${language}/` : '') + doc;
  }

  render() {
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={this.props.config.baseUrl} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width="66"
                height="58"
              />
            )}
          </a>
          <div>
            <h5>Docs</h5>
            <a href={this.docUrl('installation.html', this.props.language)}>
              Installation
            </a>
            <a href={this.docUrl('configuration.html', this.props.language)}>
              Configuration
            </a>
            <a href={this.docUrl('front-end-and-verification.html', this.props.language)}>
              Front-End & Verification
            </a>
            <a href={this.docUrl('production.html', this.props.language)}>
              Production
            </a>
          </div>
          <div>
            <h5>Community</h5>
            <a href={this.pageUrl('users.html', this.props.language)}>
              User Showcase
            </a>
            <a href="https://keybase.io/team/hyperglass">Project Chat</a>
            <a
              href={`https://twitter.com/${this.props.config.twitterUsername}`}
              target="_blank"
              rel="noreferrer noopener">
              Twitter
            </a>
          </div>
          <div>
            <h5>More</h5>
            <a href={this.props.config.repoUrl}>GitHub</a>
            <a
              className="github-button"
              href={this.props.config.repoUrl}
              data-icon="octicon-star"
              data-count-href="/facebook/docusaurus/stargazers"
              data-show-count="true"
              data-count-aria-label="# stargazers on GitHub"
              aria-label="Star this project on GitHub">
              Star
            </a>
          </div>
        </section>
        <section className="copyright">{this.props.config.copyright}</section>
      </footer >
    );
  }
}

module.exports = Footer;
