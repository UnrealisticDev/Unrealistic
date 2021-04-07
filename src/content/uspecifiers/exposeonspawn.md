---
id: 2soH1lf2HCdoRlgawRt063
title: ExposeOnSpawn
snippet: Exposes this property as a pin when the containing Object or Actor is created.
values: null
combos:
- blueprintreadonly
- blueprintreadwrite
---
The `ExposeOnSpawn` specifier exposes a property as a node pin when constructing the containing class. This allows for terse construction in Blueprints using only a single construct node, as opposed to first constructing the object and then setting properties individually. For example, consider the following property contained within a `UserWidget` class:

```cpp
UPROPERTY(BlueprintReadOnly, meta=(ExposeOnSpawn="true"))
UTowerAction* Action;
```

When the `UserWidget` class is created, the `Action` property is exposed for initialization:

![Live demo](https://i.imgur.com/he7U1Rl.png)

Notwithstanding its name, this specifier can be applied to properties of both `Actors` (which are spawned) *and* `Objects` (which are constructed).

Given that the decorated property is exposed on a Blueprint node, this specifier must be coupled with either of the `BlueprintReadOnly` or `BlueprintReadWrite` specifiers. If it is marked `BlueprintReadOnly`, the property can still be initialized on spawn but cannot be written within Blueprints thereafter.

The behavior of this specifier is unclear with respect to `Delegates`. For further information, see [this article](https://answers.unrealengine.com/questions/599048/cant-expose-delegate-on-spawn.html) and [UE-44977](https://issues.unrealengine.com/issue/UE-44977).

To achieve similar behavior when spawning actors or constructing objects from C++, check out [`SpawnActorDeferred`](https://github.com/EpicGames/UnrealEngine/blob/release/Engine/Source/Runtime/Engine/Classes/Engine/World.h).
