The `BlueprintType` specifier is the specifier that you will likely use most when working with UStructs. It *exposes* a struct to Blueprints and to general use within the Editor. For example, with this specifier, a struct can be added as a variable to a Blueprint. 

The Blueprint graph context menu will also provide you options to *make* or *break* the struct.

You can also use the struct as a return value or parameter for `BlueprintCallable` and `BlueprintPure` functions.

Finally, you can read properties on the struct within a Blueprint graph, so long as those properties are marked `BlueprintReadOnly`. If the properties are marked `BlueprintReadWrite`, you can also edit those properties. (Conversely, you cannot mark a struct property as `BlueprintReadOnly` or `BlueprintReadWrite` if the struct is not `BlueprintType`.)