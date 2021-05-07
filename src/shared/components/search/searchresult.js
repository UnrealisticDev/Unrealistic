import { Link } from "gatsby";
import { default as React } from "react";
import {
  connectStateResults,
  Hits,
  Index,
  PoweredBy
} from "react-instantsearch-dom";
import { getPostSlug } from "../../scripts/router";

const HitCount = connectStateResults(({ searchResults }) => {
  const hitCount = searchResults && searchResults.nbHits;

  return hitCount > 0 ? (
    <div className="HitCount">
      {hitCount} result{hitCount !== 1 ? `s` : ``}
    </div>
  ) : (
    <p className="content has-text-grey">No results</p>
  );
});

const PageHit = ({ hit }) => (
  <Link key={hit.id} to={getPostSlug(hit.slug)}>
    <button
      className="button is-light is-fullwidth has-text-left"
      style={{ textAlign: "right !important" }}
    >
      {/* <Highlight attribute="title" hit={hit} tagName="mark" /> */}
      <div style={{ width: "100%" }}>{hit.title}</div>
    </button>
  </Link>
);

const HitsInIndex = ({ index, hitComponent }) => (
  <Index indexName={index}>
    <HitCount />
    <Hits className="Hits" hitComponent={hitComponent ? hitComponent : PageHit} />
  </Index>
);

const SearchResult = ({ index, show, hitComponent, className  }) => {
  return show ? (
    <div className={className}>
      <div className="box">
        <HitsInIndex index={index} hitComponent={hitComponent} />
        <hr />
        <PoweredBy />
      </div>
    </div>
  ) : null;
};

export default SearchResult;
