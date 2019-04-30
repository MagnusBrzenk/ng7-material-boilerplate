# Navigation Module Overview

This module enables you to specify a single array of nested menu items which will then populate the toolbar menu and the sidenav menu. In theory, you ojnly need to adjust the contents of that array in `navigation.service.ts`.

Additionally, the header component contains logic to enable mouse-hovering dropdown effects in the toolbar menu. By default, this is disabled, but can be switched on the settings section. It is not recommended -- Material Guidleines recommend against dropdowns. Also -- be warned -- it's a _mega time sink_ getting this functionality to work in the midst of Angular Material stylings; do NOT try to advance this functionality; if it breaks in the face of future Angular Material updates, then I'd recommend removing it altogether.
