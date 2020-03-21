import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Signature from '../components/Signature';
import PhotoCredits from '../components/PhotoCredits';
import Content, { HTMLContent } from '../components/Content';
import HeaderImage from '../components/HeaderImage';

export const BlogPostTemplate = ({
  content,
  contentComponent,
  title,
  helmet,
  featuredimage,
  photographername,
  photographerurl
}) => {
  const PostContent = contentComponent || Content;

  return (
    <>
      {helmet || ''}
      <HeaderImage imageInfo={featuredimage} />
      <section className="section">
        <main className="content">
          <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
            {title}
          </h1>
          <PostContent content={content} />
          <Signature />
          {photographername && (
            <PhotoCredits name={photographername} url={photographerurl} />
          )}
        </main>
      </section>
    </>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  helmet: PropTypes.element.isRequired,
  featuredimage: PropTypes.shape({
    alt: PropTypes.string,
    childImageSharp: PropTypes.object,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    style: PropTypes.object
  }).isRequired,
  photographername: PropTypes.string,
  photographerurl: PropTypes.string
};

BlogPostTemplate.defaultProps = {
  photographername: null,
  photographerurl: null
};

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        featuredimage={post.frontmatter.featuredimage}
        title={post.frontmatter.title}
        photographername={post.frontmatter.photographername}
        photographerurl={post.frontmatter.photographerurl}
      />
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      post: PropTypes.string,
      frontmatter: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        featuredimage: PropTypes.shape({
          alt: PropTypes.string,
          childImageSharp: PropTypes.object,
          image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
          style: PropTypes.object
        }),
        photographername: PropTypes.string,
        photographerurl: PropTypes.string
      })
    })
  }).isRequired
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        photographername
        photographerurl
        featuredimage {
          childImageSharp {
            fluid(maxWidth: 1200, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
