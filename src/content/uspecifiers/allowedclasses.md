---
id: uvVO5XRJ0sexydzwbKPXl
title: AllowedClasses
snippet: Applies to SoftObjectPath properties. Indicates types of assets to be displayed in asset picker.
values:
- Actor
- Pawn
- Character
---
By default, a `FSoftObjectPath` property can be set to any asset. The `AllowedClasses` specifier limits the asset selection UI to show only those assets that derive from the enumerated types. The comma-separated list should contain type names without leading letters (e.g. `Actor` instead of `AActor`).

For instance, in the following example, the asset selection UI will only show assets that are of type `UMaterialInterface`.

```cpp
UPROPERTY(Meta=(AllowedClasses="MaterialInterface"))
FSoftObjectPath MaterialPath;
```
