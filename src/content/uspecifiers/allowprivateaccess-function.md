---
id: 4zNPQ9GldMaacPJ8ywRDzD
title: AllowPrivateAccess
snippet: Allows a private function to be accessed from Blueprints.
values: true
---
The `AllowPrivateAccess` specifier allows a function that is marked private to be accessed from Blueprints. Typically, a function marked private cannot be called outside of the declaring class.

However, if this specifier is supplied, the Engine will generate code that allows the function to be called from Blueprints. Both subclasses and unrelated classes can access the function. Naturally, this breaks the concept of encapsulation, but the specifier is often used nevertheless for reasons of convenience (i.e. to save on creating boilerplate getter/setter functions for Blueprint access).
