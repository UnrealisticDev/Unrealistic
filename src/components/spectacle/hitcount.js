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

export default () => {
  const [hitCount, setHitCount] = useState(0);

  countapi
    .get(counterID.namespace, counterID.key)
    .then(({ value }) => setHitCount(value));

  return (
    hitCount > VISIBILITY_THRESHOLD && <div>Over {convertCountToThousands(hitCount)} pawns served</div>
  );
};
