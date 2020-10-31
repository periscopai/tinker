source ?= src/app.js

.PHONY: help
help:
	@echo "reac-dev : should only be called once to setup all the JS stuff"
	@echo "install  : installs all the module dependency"
	@echo "run      : starts babel to cross compile the code and start the live server" 

.PHONY: react-dev
react-dev:
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
	@echo *** installing live-server
	yarn global add live-server
	@echo *** installing babel-cli
	yarn global add babel-cli@6.24.1

	@echo "VERSION INSTALLED"
	@echo "NODE JS     : " `nodejs -v`
	@echo "NPM         : " `npm -v`
	@echo "YARN        : " `yarn -v`
	@echo "LIVE-SERVER : " `live-server --version`
	@echo "BABEL-CLI   : " `babel --version`

.PHONY: install
install:
	yarn install

.PHONY: run
run:
	babel $(source) --out-file=public/scripts/app.js --presets=env,react --watch &
	live-server public

 