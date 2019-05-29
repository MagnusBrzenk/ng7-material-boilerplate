#! /bin/bash

# Import env variables:
if [ -f $PWD/.env ]; then
  echo ">>> Loading env vars from .env"
  eval $(cat .env | sed 's/^/export /')
else
  echo "No .env file found!!!"
  return 1
fi

# Determine basehref
if [[ $1 == "github" ]]; then
  echo '''
  ============================================
  BUILDING PRODUCTION BUNDLES FOR GITHUB PAGES
  ============================================
  '''
  BASE_HREF="https://"$GITHUB_USER_NAME".github.io/"$GITHUB_REPO_NAME"/"
else
  echo '''
  =========================================
  BUILDING PRODUCTION BUNDLES FOR LOCAL RUN
  =========================================
  '''
  BASE_HREF=""
fi

# Check to generate stats.json
STATS=''
if [[ $2 == 'stats' ]]; then
  STATS='--stats-json'
fi

printf "\n>>> Running tests... "
ng test --browsers ChromeHeadless --watch=false >.test_report.txt

if [[ $? == 0 ]]; then

  printf "done! All tests passed!\n"

  echo ">>> Cleaning out old compilations..."
  rm -rf ./dist

  echo ">>> Building fresh web app..."
  NODE_ENV=prod ./node_modules/.bin/ng build --prod --aot --vendor-chunk --base-href $BASE_HREF -- $STATS

else
  printf "done :( Not all tests were succesful! See '.test_report.txt' for details."
  return 1
fi
