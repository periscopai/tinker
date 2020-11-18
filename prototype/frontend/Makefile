source ?= src/app.js
webpack ?= periscopai
WEBPACK_CFG_NAME=$(webpack)
NODE_MODULE=$(shell pwd)/node_modules
export PATH:=$(NODE_MODULE)/.bin:$(PATH)

.PHONY: help
help:
	@echo "setup : should only be called once to setup all the JS stuff"
	@echo "install  : installs all the module dependency"
	@echo "run      : starts webpack server - by default it runs the periscopai configuration - use pakt for fun" 
	@echo "build    : build the bundle file through webpack"
	@echo "doc      : generate the documentation"
	@echo
	@echo "Configuration: $(WEBPACK_CFG_NAME) - use webpack=<config name> to change" 
	@echo "Node modules: $(NODE_MODULE)"

.PHONY: setup
setup:
	@echo *** installing NodeJS version 15
	curl -sL https://deb.nodesource.com/setup_15.x -o nodesource_setup.sh
	sudo bash nodesource_setup.sh  
	sudo apt-get install -y nodejs 
	@echo *** installing yarn
	curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
	echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
	sudo apt update
	sudo apt install yarn
	PATH=$PATH:$HOME/.yarn/bin/
	@echo "VERSION INSTALLED"
	@echo "NODE JS     : " `nodejs -v`
	@echo "NPM         : " `npm -v`

.PHONY: install
install:
	yarn install
	@echo "YARN        : " `yarn -v`
	@echo "LIVE-SERVER : " `live-server --version`
	@echo "BABEL-CLI   : " `babel --version`



.PHONY: run
run:
	@echo "webpack server for '$(WEBPACK_CFG_NAME)' configuration"	
	webpack serve --config-name=$(WEBPACK_CFG_NAME)

.PHONY: build
build:
	@echo "webpack build for '$(WEBPACK_CFG_NAME)' configuration"
	webpack --config-name=$(WEBPACK_CFG_NAME)

 .PHONY: docs
 doc:
	jsdoc $(source) --destination ./docs/autogen
	firefox ./docs/autogen/index.html
