---
id: 1yw26Fa8CkYKdgmoWqfdyp
title: AllowPreserveRatio
snippet: Applies to FVector properties. Adds a ratio lock button to property in details panel.
values: ['true']
---
The `AllowPreserveRatio` specifier, which applies only to `FVector` properties, adds a ratio lock button (indicated by a padlock) to the details panel display. Most users will likely have seen this specifier in action for an Actor's `Scale` property.

The lock can be toggled on and off. When enabled, changes to one component of a vector will be proportionally applied to the other components of the vector. Consider the following vector.

```cpp
UPROPERTY(Meta=(AllowPreserveRatio="true"))
FVector Scale; // X=1.0, Y=2.0, Z=3.0
```

If the lock is enabled and `Scale.X` is manually set to `2.0` (an increase of 100%), the remaining values of `Scale.Y` and `Scale.Z` will be automatically set to `4.0` and `6.0`, respectively (after applying 100% increase). This can be very useful when resizing meshes or in other contexts where you want to preserve the ratio of vector components.
