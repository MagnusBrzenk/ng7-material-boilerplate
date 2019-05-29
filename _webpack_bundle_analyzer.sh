#! /bin/bash

clear

source _build_prod.sh '' stats

echo '''
===============================
RUNNING WEBPACK-BUNDLE-ANALYZER
===============================
'''

./node_modules/.bin/webpack-bundle-analyzer ./dist/stats.json
