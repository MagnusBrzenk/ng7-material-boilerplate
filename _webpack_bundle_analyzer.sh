#! /bin/bash

clear

# echo '''
# ===============================
# RUNNING WEBPACK-BUNDLE-ANALYZER
# ===============================
# '''

# # Import env variables:
# if [ -f $PWD/.env ]; then
#   echo ">>> Loading env vars from .env"
#   eval $(cat .env | sed 's/^/export /')
# else
#   echo "No .env file found!!!"
#   return 1
# fi

# echo ">>> Cleaning out old compilations..."
# rm -rf ./dist

# echo ">>> Building fresh web app..."
# ./node_modules/.bin/ng build --prod --base-href "https://"$GITHUB_USER_NAME".github.io/"$GITHUB_REPO_NAME"/" --aot --vendor-chunk -- --stats-json

source _build_prod.sh stats

echo ">>> Running WBA..."
./node_modules/.bin/webpack-bundle-analyzer ./dist/stats.json
