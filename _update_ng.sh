#! /bin/bash

clear

echo "
===================
UPDATING NG MODULES
===================
"

VERSION='^7.2.15'

# Upgrade dependencies
npm install -S @angular/{animations,common,compiler,core,forms,material,platform-browser,platform-browser-dynamic,platform-server,router,service-worker}@$VERSION

# Upgrade dev-dependencies
npm install -S @angular/{compiler-cli,language-service}@$VERSION
