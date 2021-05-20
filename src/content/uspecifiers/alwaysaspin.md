---
id: 251cd2Zbeiyx596wKCLGni
title: AlwaysAsPin
snippet: The property is always exposed as a data pin. Used by animation nodes.
values: null
combos:
  - blueprintreadwrite
mutex:
  - neveraspin
  - pinhiddenbydefault
  - pinshownbydefault
---
The `AlwaysAsPin` specifier is used exclusively by a handful of animation nodes. Properties of an animation node can be exposed either as pins on the node or as fields in the Details panel. This specifier ensures that a given property appears as a pin on the node and *not* as a field in the Details panel.

It must be combined with `BlueprintReadWrite`.
