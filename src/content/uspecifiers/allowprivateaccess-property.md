---
id: 6SN4nO2F3iU7sFzXKTHeoS
title: AllowPrivateAccess
snippet: Allows a private property to be accessed from Blueprints.
values: true
combos:
- blueprintreadonly
- blueprintreadwrite
---
The `AllowPrivateAccess` specifier allows a property that is marked private to be accessed from Blueprints. Typically, a property marked private cannot be accessed outside of the declaring class.

However, if this specifier is supplied, the Engine will generate code that allows the property to be read and written from Blueprints. Both subclasses and unrelated classes can access the property. Naturally, this breaks the concept of encapsulation, but the specifier is often used nevertheless for reasons of convenience (i.e. to save on creating boilerplate getter/setter functions for Blueprint access).

This specifier must be paired with a Blueprint visibility specifier: either `BlueprintReadOnly` or `BlueprintReadWrite`.
