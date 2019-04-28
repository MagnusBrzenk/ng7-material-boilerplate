#! /bin/bash

echo '''
==============================
BUILD & DEPLOY TO GITHUB PAGES
==============================
'''

# Import env variables:
if [ -f $PWD/.env ]; then
  echo ">>> Loading env vars from .env"
  eval $(cat .env | sed 's/^/export /')
else
  echo "No .env file found!!!"
  return 1
fi

echo ">>> Cleaning out old compilations..."
rm -rf ./dist

echo ">>> Building fresh web app..."
./node_modules/.bin/ng build --prod --aot --vendor-chunk --base-href "https://"$GITHUB_USER_NAME".github.io/"$GITHUB_REPO_NAME"/"

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
