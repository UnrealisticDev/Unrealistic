---
id: 2zANtJr2ubAWqJEOOTBplb
title: Abstract
snippet: This class cannot be instantiated except when subclassed.
values: null
combos: null
mutex: null
---
The `Abstract` specifier makes a class uninstantiable in the Editor and for all other purposes. This has several implications, including that the class (if it is an `Actor`) may not be placed in a `Level`. Nor can `Abstract` components be added to Actors. It also means that non-`Actor` classes cannot be instanced in Blueprints (e.g. by using a `Construct` node). This specifier prevents instantiation of the class in code as well. For example, the `UMeshComponent` class is marked as `Abstract`. This means that the following [constructor code][0], which attempts to instantiate a Mesh Component, will fail to compile:

```cpp
AActor::AActor()
{
  MeshComp = CreateDefaultSubobject<UMeshComponent>(TEXT("Mesh"));
}
```

The Unreal Header Tool will emit the following (or a similar) error message: "Class which was marked abstract was trying to be loaded. It will be nulled out on save." However, subclasses of an `Abstract` class *can* be instantiated. For example, the following construction using `USkeletalMeshComponent`, a subclass of `UMeshComponent`, compiles without issue:

```cpp
AActor::AActor()
{
  MeshComp = CreateDefaultSubobject<USkeletalMeshComponent>(TEXT("Mesh"));
}

On a related note, a Blueprint class can be marked as `Abstract` from its *Class Settings* panel. This appears to have the same behavior as marking a native class with the `Abstract` specifier. 

[0]: https://forums.unrealengine.com/development-discussion/c-gameplay-programming/22877-class-which-was-marked-abstract-was-trying-to-be-loaded
