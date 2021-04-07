---
id: 4jjZaEIHxBmdZbWBGzVAPi
title: Blueprintable
snippet: A Blueprint can be created from this class.
values: null
mutex:
- notblueprintable-class
---
Classes tagged with the `Blueprintable` specifier can be inherited by Blueprints and, as such, this specifier sees frequent use throughout the Engine and in game-specific implementations. For example, tagging the following class with this specifier enables one to create a Blueprint from it in the Editor:

```cpp
UCLASS(Blueprintable)
class UCoolComponent : public UActorComponent
```

This specifier can be applied to all derivatives of the `UObject` class, including Components, Actors, and direct descendants of UObject.
