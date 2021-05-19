---
id: 31RIVaCwMUnIFfATnJGDzR
title: PinShownByDefault
snippet: The property is exposed as a data pin by default, but may be hidden. Used by animation nodes.
values: null
combos:
- blueprintreadwrite
- editanywhere
mutex:
- alwaysaspin
- neveraspin
- pinhiddenbydefault
---
The `PinShownByDefault` specifier is used exclusively by a handful of animation nodes. Properties of an animation node can be exposed either as pins on the node or as fields in the Details panel. This specifier ensures that a given property appears as a pin on the node, and it may also be viewed as a field in the Details panel. The UI will contain an eye icon that can be used to toggle visibility of the property pin.

It must be combined with `BlueprintReadWrite` and `EditAnywhere`.
