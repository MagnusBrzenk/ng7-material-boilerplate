# Ng7MaterialBoilerplate

Last updated: May 7th, 2019

This is an angular boilerplate for ng v7. It is to be my last ng boilerplate before ivy gets built (well).

To some extent, this project is also designed to document/explain various aspects of the angular-cli setup (how various commands, configuration pieces work together).

## Acknowledgements

A lot of the patterns used here are borrowed or adapted from the [Angular NGRX Material Starter (ANMS)](https://tomastrajan.github.io/angular-ngrx-material-starter#/about) repo. I am very grateful to all ANMS's contributors for putting together such a rich set of features. I hope this simplified / stripped down / adapted / different approach to a boilerplate can be useful to others too.

## Dev Plan

### Architectural Aspects

- [x] Add git configuration instructions
- [x] Make deploy-able to github pages
- [x] Webpack-bundle analyzer
- [x] Formatting - Customize prettier, eslint, auto-formatting - Add husky pre-commit formatting
- [x] PWA Basics
- [x] Angular Material Modules - Implement Modern
  - [x] Implement my navigation system
- [x] Angular Animations
- [ ] Google Analytics
- [ ] Circle CI
- [ ] Basic node backend
  - [ ] Auth route
  - [ ] Auth-ed image upload route
  - [ ] Contact-form-email route

## Building New Project From This Boilerplate

This work flow assumes you have a github account under `USERNAME` with a ssh public key saved in `settings > SSH and GPG keys` corresponding to an ssh key pair on your local \*nux machine (e.g. `~/.ssh/id_rsa_github` and `~/.ssh/id_rsa_github.pub`), and a local ssh configuration (`~/.ssh/config`) of the form:

```
# Personal github account
Host USERNAME.github.com
HostName github.com
User git
IdentityFile ~/.ssh/id_rsa_github

# Company github account
Host ...
```

1. `git clone https://github.com/MagnusBrzenk/ng7-material-boilerplate.git YYY; cd YYY; npm i`
2. `git config user=YOUR_NAME`
3. `git config email=YOUR_EMAIL`
4. Create repo at github with new name (e.g. `NEW_REPO`)
5. `git remote add origin git@USERNAME.github.com:USERNAME/NEW_REPO.git` (note the double occurrence of the user name!)
6. Change `--href` in `_deploy_github_pages.sh` to `https://USERNAME.github.io/NEW_REPO/`
7. Make sure you have a global install of [angular-cli-ghpages](https://www.npmjs.com/package/angular-cli-ghpages)
8. Start making commits and then `git push origin master -u`
9. When you want to push changes to github-pages, simple run `_deploy_github_pages.sh`
10. Note to self: when you create a boilerplate using `ng new XXX`, the output path will read `dist/project-name` by default, and I've been changing this to just `dist` so that the products are put directly into the the `dist` folder.

... and you're good to develop! If you prefer to fork then, well, it's pretty asy to adapt from these instructions.

## Formatting, TSLint, Etc.

This boilerplate aims to make code formatting consistent across multi developers. There are two things to consider: formatting code as you edit, and formatting code when you make git commits. Ideally, of course, you want your editor to format your code the same way that your git-commit hooks will (so there are no surprises).

Git-commit formatting is accomplished by the inclusion of `husky` and `lint-staged` configurations in `package.json`. Quite simply, when you make a commit,

`prettier` has been added for formatting along with vscode settings. Basic formatting parameters are provided in `.prettierrc`. However, whenever possible, it's preferable to put formatting settings in `.editorconfig` for consistency across development environments. So if you're using an editor other than VSCode then, for consistency, it's recommended you set up formatting to follow `.prettierrc` and then `.editorconfig`.

`husky` and `lint-staged` configurations have been added to `package.json` so that git commits trigger prettier formatting and linting (with `ng lint`).

## PWA Capabilities

This is a Progressive Web App ([PWA](https://en.wikipedia.org/wiki/Progressive_web_applications)). In this example, you can see the PWA in action by viewing the [deployed demo site]() on a smart phone and saving it to your home screen so that it behaves like a native app. (On an iPhone, visit the demo site on Safari, press the share icon, and, by scrolling right, you'll find an icon called 'Add to Home Screen'.)

To adjust the PWA behavior, edit files `src/manifest.json` and `src/ngsw-config.json`. In particular, you need to set the `start_url` field in `src/manifest.json`.

## Angular Animations

This site uses [Angular Animations](https://angular.io/guide/animations) to control effects upon the site's first load, and for subsequent page changes as detected by the angular router.

The approach taken here is influenced by the approach used in [Angular NGRX Material Starter (ANMS)](https://tomastrajan.github.io/angular-ngrx-material-starter#/about), but is somewhat simpler (IMHO), and is designed to avoid some [niche problems](https://github.com/tomastrajan/angular-ngrx-material-starter/issues/451) experienced with the ANMS approach.

Key to the proper working of animations in this repo is to make sure that the components that are added/removed by the component have absolute positioning. This is achieved by ...

## Development Notes

- Spent some time trying different settings for html formatting. Decided to go with `prettier` in the end for consistency and so that husky-formatting might work, despite the fact that it doesnt seem to let you customize the formatting. NOTE: lost some time because I had had '\*.html' in the `.prettierignore` file!

- I had experimented with adding the ability to trigger the menu-bar material menus by mouse hover. The code I got to can be found in git SHA `1310db8`. While this implementation worked when originally implemented, the fact that it broke on subsequent versions of ng/material shows how ill-advised it is to try and subvert the behavior of the material library. As such, I attempted to remove all this additional functionality in the branch `005-cleanUpNavHoveringEtc`.

- I think the local-storage implementation of material starter is overly complicated, so I started again making it super simple (not bothering with ngrx, removing prefixes, etc.). I implemented a check however to make sure that the local storage object would only take on permitted key-value pairs.

- The route-transition animations proved a big challenge. I tried to implement a somewhat complex `sequence` of animation steps where the ':leave' page would simultaneously effect-away with the footer (using a `group`). Unfortunately, I wasn't able to get it to work and I concluded that it's because the `sequence` function [doesn't handle `query` calls correctly](https://github.com/angular/angular/issues/30361). I therefore simplified the page :enter-:leave sequence (so it's very similar to ANMS), and I separated the footer animation out into separate CSS animations (the footer starts disappearing when the angular animation begins, and when the angular animation ends, the footer is made to reappear). Not quite what I originally wanted, but the code is much simpler and the difference in timings etc. is hardly noticeable.

- I eventually gaver up on the approach to footers implemented by ANMS and used in stead the SCSS, etc. of [cankattwinkel](https://cankattwinkel.github.io/material-2-sticky-footer-mat-sidenav/demo-app/three). This worked out great and paved the way to a working boilerplate with nice cross-browser layout and animations on OSX and iOS.
