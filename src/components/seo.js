import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

import logo from "../images/logo.png";

function SEO({
  title,
  titleOverride,
  description,
  canonical,
  image,
  type,
  datePublished,
  dateModified,
  body,
  meta
}) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            url
            title
            tagline
            author
          }
        }
      }
    `
  );

  const { url, tagline, author } = site.siteMetadata;
  const metaTitle = titleOverride ? title : `${title} | Unrealistic`;
  const metaDescription = description || tagline;
  const canonicalUrl = `${url}${canonical}`;
  const displayImage = image ? `${image}` : `${url}${logo}`;

  const structuredDataPost = `{
    "@context": "http://schema.org",
    "@type": "${type}",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "${canonicalUrl}"
    },
    "headline": "${metaTitle}",
    "description": "${metaDescription}",
    "url": "${canonicalUrl}",
    "image": "${displayImage}",
    "articleBody": "${body}",
    "datePublished": "${datePublished}",
    "dateModified": "${dateModified}",
    "author": {
      "@type": "Person",
      "name": "${author}"
    },
    "publisher": {
      "@type": "Organization",
      "name": "${author}",
      "logo": {
        "@type": "ImageObject",
        "url": "${logo}"
      }
    }
  }`;
  const metaStructuredData = type === "BlogPosting" ? structuredDataPost : null;

  return (
    <>
      <Helmet>
        {/* The language this site is written in/supports. */}
        <html lang="en" dir="ltr" />

        {/* The title of this webpage - shows up in tab and search engines. */}
        <title>{metaTitle}</title>

        {/* The description of this webpage - shows up in search engines. */}
        <meta name="description" content={metaDescription} />

        {/* The canonical (i.e. master) url for this page. 
          Prevents search engine confusion about duplicate pages, which can reduce ranking. */}
        {canonical && <link rel="canonical" href={canonicalUrl} />}

        {/* The image that displays when this page is shared/appears in search result. */}
        <meta name="image" content={displayImage} />

        {/* Opengraph meta tags for Facebook and LinkedIn shares. */}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={displayImage} />
        <meta property="og:type" content="NewsArticle" />

        {/* Opengraph meta tags for LinkedIn */}
        <meta name="image" property="og:image" content={displayImage}/>
        <meta name='author' content={author}/>

        {/* Tags for Twitter and Slack. */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content={author} />
        <meta name="twitter:site" content="@UnrealisticDev" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image:src" content={displayImage} />

        {/* Structured data - consumed by search engines for rich results. */}
        {metaStructuredData && (
          <script type="application/ld+json">{metaStructuredData}</script>
        )}
      </Helmet>
    </>
  );
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired
};

export default SEO;
