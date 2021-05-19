---
id: 5Ic6MPe4JBz0EMrNxOqZuU
title: AllowAbstract
snippet: Allows Abstract classes to be selected in the class picker. Applies to Subclass and SoftClass properties only.
values: true
---
As a general matter, [`Abstract`](abstract) classes cannot be picked from the Editor class picker. Adding the `AllowAbstract` specifier to a `Subclass` or `SoftClass` property, and setting its value to true, will allow `Abstract` classes to be set for that property.

Consider the following abstract class.

```cpp
UCLASS(Abstract)
class USomeAbstractClass : public UObject
{
    ...
}
```

Normally, you would not be able to select this class in a class picker dropdown. However, by adding the `AllowAbstract` specifier to the following properties, the abstract class can be selected.

```cpp
UPROPERTY(Meta=(AllowAbstract="true"))
TSubclassOf<UObject> Subclass;

UPROPERTY(Meta=(AllowAbstract="true"))
TArray<FSoftClassPath> SoftClassPaths;
```
