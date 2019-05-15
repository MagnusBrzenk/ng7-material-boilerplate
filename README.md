# Ng7MaterialBoilerplate

Last updated: May 15th, 2019

This is an angular boilerplate for angular v7.

To some extent, this project is also designed to document/explain various aspects of the angular-cli setup (how various commands, configuration pieces work together).

## Acknowledgements

A lot of the patterns used here are borrowed or adapted from the [Angular NGRX Material Starter (ANMS)](https://tomastrajan.github.io/angular-ngrx-material-starter#/about) repo. I am very grateful to all ANMS's contributors for putting together such a rich set of features. I hope this simplified / stripped down / adapted / different approach to a boilerplate can be useful to others too.

## Dev Plan

### Architectural Aspects

- [x] Initial set-up instructions
- [x] Formatting
  - [x] Customize prettier, eslint, auto-formatting
  - [x] Husky pre-commit formatting
- [x] PWA Basics
- [x] Angular Material Modules - Implement Modern
  - [x] Implement my navigation system
  - [x] Implement custom themes
- [x] Angular Animations
  - [x] Site-loading animations
  - [x] Router-transition animations
  - [x] Staggered-element animations
- [x] Basic Testing
- [x] Build Scripts
  - [x] Prod build
  - [x] Webpack-bundle analyzer
  - [x] Deploy to github
- [ ] Google Analytics
- [ ] Circle CI
- [ ] Basic demo node backend
  - [ ] Auth route
  - [ ] Auth-ed image upload route
  - [ ] Contact-form-email route

## Building New Project From This Boilerplate

This work flow assumes you have a github account under `USERNAME` with a ssh public key saved in `settings > SSH and GPG keys` on github corresponding to an ssh key pair on your local \*nux machine (e.g. `~/.ssh/id_rsa_github` and `~/.ssh/id_rsa_github.pub`), and a local ssh configuration (`~/.ssh/config`) of the form:

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
6. Copy `.env-template` to `.env`
7. Replace the env variables in `.env` with values corresponding to your github account.
8. Start making commits and then `git push origin master -u`
9. When you want to push changes to github-pages, simply run `_deploy_github_pages.sh`

... and you're good to develop! If you prefer to fork then, well, it's pretty easy to adapt from these instructions.

## Operating The Codebase

I advocate placing all regularly used command sequences in scripts. So, besides looking in the usual `package.json` for angular-CLI commands, you can find useful sequences of commands in bash scripts beginning `_`.

## Formatting, TSLint, Etc.

This boilerplate aims to make code formatting consistent across multiple developers. There are two things to consider: formatting code as you edit, and formatting code when you make git commits. Ideally, of course, you want your editor to format your code the same way that your git-commit hooks will (so there are no surprises).

Git-commit formatting is accomplished by the inclusion of `husky` and `lint-staged` configurations in `package.json`. Quite simply, when you make a commit, `prettier` will run, adjust your code according to settings in `.prettierrc`, and then complete the commit.

Whenever possible, it's preferable to put formatting settings in `.editorconfig` for consistency across development environments. So if you're using an editor other than VSCode then, for consistency, it's recommended you set up formatting to follow `.prettierrc` and then `.editorconfig`.

Modifications have also been made to the original angular-CLI-generated code. In particular, additional `Added TS Strictness` settings have been added to `tsconfig.json`.

If you are editing in VSCode, then I recommend you install [Angular Essentials](https://marketplace.visualstudio.com/items?itemName=johnpapa.angular-essentials) for a robust developer experience, including running analysis of your angular templates. Settings for VSCode are included in `.vscode` designed to unify the editor layout/formatting with the git precommit-hook formatting.

## PWA Capabilities

This is a Progressive Web App ([PWA](https://en.wikipedia.org/wiki/Progressive_web_applications)). In this example, you can see the PWA in action by viewing the [deployed demo site]() on a smart phone and saving it to your home screen so that it behaves like a native app. (On an iPhone, visit the demo site on Safari, press the share icon, and, by scrolling right, you'll find an icon called 'Add to Home Screen'.)

To adjust the PWA behavior, edit files `src/manifest.json` and `src/ngsw-config.json`. In particular, you need to set the `start_url` field in `src/manifest.json`.

## Angular Animations

This site uses [Angular Animations](https://angular.io/guide/animations) to control effects upon the site's first load, and for subsequent page changes as detected by the angular router.

The approach taken here is influenced by the approach used in [Angular NGRX Material Starter (ANMS)](https://tomastrajan.github.io/angular-ngrx-material-starter#/about), but is somewhat simpler (IMHO), and is designed to avoid some [niche problems](https://github.com/tomastrajan/angular-ngrx-material-starter/issues/451) experienced with the ANMS approach.

Beware: I ran into a [suspected bug](https://github.com/angular/angular/issues/30361) in angular animations, which forced me to make the animation sequence less complex than I originally intended. This is probably a good thing; I've come to believe that angular animations, while potentially powerful, are best kept short and simple, as is the case in this code base.

## Acknowledgements

Besides the angular CLI, parts of this codebase are based upon work by [AMNS](https://tomastrajan.github.io/angular-ngrx-material-starter) and [The Code Campus](https://www.thecodecampus.de/). Many thanks!

## Development Notes (to Self)

- I tried implementing this boilerplate with ng8 and the ivy beta release. Ran into problems. Will try again later when Ivy is established -- probably ng9.

- When you create a boilerplate using `ng new XXX`, the output path will read `dist/project-name` by default, and I've been changing this to just `dist` so that the products are put directly into the the `dist` folder.

- Spent some time trying different settings for html formatting. Decided to go with `prettier` in the end for consistency and so that husky-formatting might work, despite the fact that it doesnt seem to let you customize the formatting. NOTE: lost some time because I had had '\*.html' in the `.prettierignore` file!

- I had experimented with adding the ability to trigger the menu-bar material menus by mouse hover. The code I got to can be found in git SHA `1310db8`. While this implementation worked when originally implemented, the fact that it broke on subsequent versions of ng/material shows how ill-advised it is to try and subvert the behavior of the material library. As such, I attempted to remove all this additional functionality in the branch `005-cleanUpNavHoveringEtc`.

- I think the local-storage implementation of material starter is overly complicated, so I started again making it super simple (not bothering with ngrx, removing prefixes, etc.). I implemented a check however to make sure that the local storage object would only take on permitted key-value pairs.

- The route-transition animations proved a big challenge. I tried to implement a somewhat complex `sequence` of animation steps where the ':leave' page would simultaneously effect-away with the footer (using a `group`). Unfortunately, I wasn't able to get it to work and I concluded that it's because the `sequence` function [doesn't handle `query` calls correctly](https://github.com/angular/angular/issues/30361). I therefore simplified the page :enter-:leave sequence (so it's very similar to ANMS), and I separated the footer animation out into separate CSS animations (the footer starts disappearing when the angular animation begins, and when the angular animation ends, the footer is made to reappear). Not quite what I originally wanted, but the code is much simpler and the difference in timings etc. is hardly noticeable.

- I eventually gave up on the approach to footers implemented by ANMS and used instead the SCSS, etc. of [cankattwinkel](https://cankattwinkel.github.io/material-2-sticky-footer-mat-sidenav/demo-app/three). This worked out great and paved the way to a working boilerplate with nice cross-browser layout and animations on OSX and iOS.
