## Bundled Markdown

This is bundled markdown found in `documentation.md` that is read in by the compiler at site build time and injected into the Javascript. This text thereby contributes to the payload size, though not by very much.

Below you'll see that this repo's readme is also displayed. However, it is handled differently. Rather than include the readme text at compile time, the Javascript bundle instead has code included in it that will asynchronously load the markdown from a remote file (in this case, from the github `readme.md` file.)
