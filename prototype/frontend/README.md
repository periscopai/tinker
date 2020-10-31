# Installation

Add the following ``export PATH=$PATH:$HOME/.yarn/bin/`` to your .zshrc or .bashrc

```shell
...
export PATH=$HOME/.cargo/bin/:$PATH
export PATH=$PATH:$HOME/.yarn/bin/

if command -v pyenv 1>/dev/null 2>&1; then
...
```

when running for the first time, run

```shell
$ make react-dev
```

This will install nodejs, yarn and all the required dependencies.

Next time around, simply install using

```shell
$ make install
```

Finally to run the code, type
```shell
$ make run [source=path_to_the_source_js]
```
This will invoke Babel to cross compile ``path_to_the_source_js`` to [public/scripts/app.js](public/scripts/app.js).
Note that you DO NOT WANT to edit this file as it is automatically generated from the source ``path_to_the_source_js``.
By default, source point to [src/app.js](src/app.js)

``make run`` will also start the live server which automatically load the code in your default browser. 
Whenever the file is saved, it is cross-compiled, then reloaded to the browser.

Simply ``CTRL-C`` make to stop this process.



---
**NOTE**

when starting ``live-server public``, if you see ``ERROR: Error: ENOSPC: System limit for number of file watchers reached, watch 'public'``
to increase the number of file watches which is most likely to reload files on the fly when they change

```
# insert the new value into the system config
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

# check that the new value was applied
cat /proc/sys/fs/inotify/max_user_watches

# config variable name (not runnable)
fs.inotify.max_user_watches=524288

```
---

# Installing the dependencies

```shell
:frontend|proto/react-frontend⚡ ⇒  make install                
yarn install
yarn install v1.22.10
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
Done in 0.67s.
```

The start the babel transcoder in one shell and the live server in the other

```
babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch &
live-server public
[1] 15176
Serving "public" at http://127.0.0.1:8080
Ready for changes
Change detected public/scripts/app.js
change src/app.js
Change detected public/scripts/app.js
change src/app.js
Change detected public/scripts/app.js
change src/app.js
Change detected public/scripts/app.js
```

# The code

The code is located under the [public](public) folder. I have documented most of it in the code 
itself.

There is a single [public/index.html](public/index.html) which loads the React libraries we will 
be using as well as the periscopai application which is located under [src/app.js](src/app.js).
This code will be transcoded to browser compatible JS unde the [public/scripts/app.js](public/scripts/app.js)

# Notes

First you need to init the project

``` shell
yarn init
```
which will create the [package.json](package.json) file in the current directory. 
This is very much the yarn equivalent of setup.py.

In this particular project, this has been done already (calling it again just goes over 
the original settings.) 


## Babel and JSX

React uses JSX templating which is not Javascript but can be converted to Javascript using [babel](https://babeljs.io/) 
more specifically React [presets](https://babeljs.io/docs/en/presets) for Babel. Presets are collection of plugins.

```shell
yarn add babel-preset-react@6.24.1
yarn add babel-preset-env@1.5.2
```

## Transcoding

```
babel src/app.js --out-file=public/scripts/app.js --presets=env,react
```

To automatically transcode the code, type 

```shell
babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch
```
and from another shell
```
live-server public
```

