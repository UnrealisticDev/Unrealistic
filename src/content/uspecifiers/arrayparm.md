---
id: 39Hw5GpvBxlT0E4VfzcLFt
title: ArrayParm
snippet: Used by the Kismet Array Library to enable wildcard behavior for array operations. 
values: [TargetArray, SourceArray]
combos:
- arraytypedependentparams
---
The `ArrayParm` specifier is found exclusively in the Kismet Array Library, where it is used to enable wildcard behavior for array operations. Specifically, the host of array operations provided by the library - add, remove, filter, etc. - are intended to work on arrays of any type. This is similar to the functionality that is exposed at the native level using template classes.

To enable this wildcard behavior, the `ArrayParm` for an array operation is set to point to the input array parameter(s). This signals to the Editor to make the specified parameter a wildcard pin which will accept an array of arbitrary type. This is useful on its own for things like `Array_Clear` which takes no other parameters and `Array_Resize` which takes an additional integer size parameter.

```cpp
UFUNCTION(BlueprintCallable, CustomThunk, meta=(DisplayName = "Clear", CompactNodeTitle = "CLEAR", Keywords = "empty", ArrayParm = "TargetArray"), Category="Utilities|Array")
static void Array_Clear(const TArray<int32>& TargetArray);
```

However, it also allows one to enforce strong typing for additional parameters when paired with the `ArrayTypeDependentParams` specifier. The `Array_Add` operation is a good example of this in action.

```cpp
UFUNCTION(BlueprintCallable, CustomThunk, meta=(DisplayName = "Add", CompactNodeTitle = "ADD", ArrayParm = "TargetArray", ArrayTypeDependentParams = "NewItem", AutoCreateRefTerm = "NewItem"), Category="Utilities|Array")
static int32 Array_Add(const TArray<int32>& TargetArray, const int32& NewItem);
```

Naturally, we do not want to add an integer to an array of strings (at least not in C++). The `ArrayParm` specifier will detect that the `TargetArray` parameter is an array of strings. It will then require that the parameter(s) listed in `ArrayTypeDependentParams`, in this case `NewItem`, is also a string. And so forth for other types.
