---
id: 6ZxpvlP925Lc3WEUUxiUdl
title: PinHiddenByDefault
snippet: The property is hidden by default, but may be exposed as a data pin. Used by animation nodes.
values: null
combos:
- blueprintreadwrite
- editanywhere
mutex:
- alwaysaspin
- neveraspin
- pinshownbydefault
---
The `NeverAsPin` specifier is used exclusively by a handful of animation nodes. Properties of an animation node can be exposed either as pins on the node or as fields in the Details panel. This specifier ensures that a given property can be viewed as a field in the Details panel, and it may also appear as a pin on the node. The UI will contain an eye icon that can be used to toggle visibility of the property pin.

It must be combined with `BlueprintReadWrite` and `EditAnywhere`.
