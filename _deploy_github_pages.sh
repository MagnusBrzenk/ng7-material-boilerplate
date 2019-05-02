#! /bin/bash

source _build_prod.sh

# Use `angular-cli-ghpages` package to do some deployment magic
# N.b. this required setting `build.options.outputPath` to just `dist` in `angular.json`
echo ">>> Deploying to github ..."

./node_modules/.bin/ngh --branch gh-pages

echo "
==========================================================
Done. Your page has been deployed to:
https://"$GITHUB_USER_NAME".github.io/"$GITHUB_REPO_NAME"/
==========================================================
"
