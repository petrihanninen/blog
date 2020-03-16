import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import BlogRoll from '../components/BlogRoll';

export const IndexPageTemplate = ({ title1, title2, heading }) => (
  <div>
    <section className="section section-center">
      <h1 className="hero">
        <div className="hero-title-1">{title1}</div>
        <div className="hero-title-2">{title2}</div>
        <div
          className="hero-title-sub"
          dangerouslySetInnerHTML={{ __html: heading }}
        />
      </h1>
      <div className="content">
        <BlogRoll />
      </div>
    </section>
  </div>
);

IndexPageTemplate.propTypes = {
  title1: PropTypes.string.isRequired,
  title2: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        title1={frontmatter.title1}
        title2={frontmatter.title2}
        heading={frontmatter.heading}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title1: PropTypes.string,
        title2: PropTypes.string,
        heading: PropTypes.string
      })
    })
  }).isRequired
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title1
        title2
        heading
      }
    }
  }
`;
