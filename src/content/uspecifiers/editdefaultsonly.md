---
id: 6QtVSJMe8I0COwtLbHxri5
title: EditDefaultsOnly
snippet: This property can be changed in the details panel of a default Blueprint but not on an instance of a Blueprint.
values: null
---
The `EditDefaultsOnly` specifier allows a property to be changed in the details panel of a default Blueprint but not on a live instance of a Blueprint. For example, if you have a property on an `Actor` subclass with this specifier, that property can be changed in the Blueprint editor for that Actor. However, when you place an instance of that Actor into your level, you cannot change the property value *for that instance*.

This specifier is mutually exclusive with the `EditAnywhere`, `VisibleAnywhere`, and `VisibleDefaultsOnly` specifiers.
