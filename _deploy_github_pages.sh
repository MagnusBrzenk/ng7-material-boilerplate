#! /bin/bash

source _build_prod.sh

if [[ $? == 0 ]]; then

  echo "
  ===========================
  DEPLOYING BUNDLES TO GITHUB
  ===========================
  "

  # Use `angular-cli-ghpages` package to do some deployment magic
  # N.b. this required setting `build.options.outputPath` to just `dist` in `angular.json`
  ./node_modules/.bin/ngh --branch gh-pages

  echo "
  ==========================================================
  Done. Your page has been deployed to:
  https://"$GITHUB_USER_NAME".github.io/"$GITHUB_REPO_NAME"/
  ==========================================================
  "
fi
