import React, { useState } from "react";
import countapi from "countapi-js";

const counterID = {
  namespace: "unrealistic.dev",
  key: "spectacle"
};

export function countHit() {
  countapi.hit(counterID.namespace, counterID.key);
}

const VISIBILITY_THRESHOLD = 1000;

function convertCountToThousands(rawCount) {
    return `${Math.floor(rawCount / 1000)}K`;
}

export default ({className}) => {
  const [hitCount, setHitCount] = useState(0);

  countapi
    .get(counterID.namespace, counterID.key)
    .then(({ value }) => setHitCount(value));

  return (
    hitCount > VISIBILITY_THRESHOLD && <div className={className}>Over {convertCountToThousands(hitCount)} pawns served</div>
  );
};
