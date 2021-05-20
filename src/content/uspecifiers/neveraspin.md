---
id: 4GxSmOxKKG1C622yKyIZ86
title: NeverAsPin
snippet: The property is never exposed as a data pin. Used by animation nodes.
values: null
combos:
  - editanywhere
mutex:
  - alwaysaspin
  - pinhiddenbydefault
  - pinshownbydefault
---
The `NeverAsPin` specifier is used exclusively by a handful of animation nodes. Properties of an animation node can be exposed either as pins on the node or as fields in the Details panel. This specifier ensures that a given property appears as a field in the Details panel and *not* as a pin on the node.

It must be combined with `EditAnywhere`.
