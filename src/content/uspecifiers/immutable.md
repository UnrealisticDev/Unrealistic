---
id: 7Ip23DhK5qZWPXcpUdbUO2
title: Immutable
snippet: This struct uses binary serialiation and may not be changed without incrementing the package version.
values: null
---
There is very little guidance regarding the `Immutable` specifier. The [official documentation](https://docs.unrealengine.com/en-US/ProgrammingAndScripting/GameplayArchitecture/Structs/Specifiers/index.html) just says that it is only legal in the *Object.h* header file and is being phased out. It also notes that the specifier should not be used for new structs. Another comment from *Class.h* suggests that the struct uses binary serialization and that it is unsafe to add or remove members to the struct without incrementing the package version.

As of 4.25, the specifier was found in only twenty-one structs, all declared in the [same file](https://github.com/EpicGames/UnrealEngine/blob/release/Engine/Source/Runtime/CoreUObject/Public/UObject/NoExportTypes.h). It is best to avoid using this specifier going forward, as any existing support will likely terminate in future versions.
