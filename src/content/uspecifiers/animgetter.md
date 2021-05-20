---
id: 6maYcvl5Mymwsfr5KR6Foi
title: AnimGetter
snippet: 
values: true
combos:
- blueprintpure
---
The `AnimGetter` specifier appears in only one place throughout the Engine: `UAnimInstance`, the parent class for Animation Blueprints. Per the comment found in that class, this specifier can ostensibly be used for any class deriving from `UAnimInstance`.

Functions marked with the `AnimGetter` specifier are available as nodes in transition graphs between different animation states. They typically provide length, play time, and related information regarding animations used in the Animation Blueprint. For example, the following `AnimGetter` function is often used to transition to the next state when the previous state's animation has reached some threshold.

```cpp
/** Get the time remaining in seconds for the most relevant animation in the source state */
UFUNCTION(BlueprintPure, Category="Asset Player", meta = (BlueprintInternalUseOnly = "true", AnimGetter="true", GetterContext="Transition"))
float GetRelevantAnimTimeRemaining(int32 MachineIndex, int32 StateIndex);
```

This specifier must be paired with the `BlueprintPure` specifier.
