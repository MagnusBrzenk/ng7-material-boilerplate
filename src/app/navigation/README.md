# Navigation Module Overview

This module enables you to specify a single array of nested menu items which will then populate the toolbar menu and the sidenav menu. The idea is that this dir is all boilerplate except for the contents of the array in `navigation.service.ts` which is what you set to get an arbitrarily complex nested menu system.

Previously I'd also attempted to make the toolbar menu have optional mouse-hovering capabilities (following efforts similar to [here](https://stackoverflow.com/questions/53618333/how-to-open-and-close-angular-mat-menu-on-hover)). However, this proved enormously complex and broke almost instantly when angular material got a minor update. Lesson: never try to do fancy stuff that requires you to understand and work with/around angular material components -- they're way too complex and subject to change.
