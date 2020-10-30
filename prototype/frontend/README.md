# Installation

Add the following ``export PATH=$PATH:$HOME/.yarn/bin/`` to your .zshrc or .bashrc

```shell
...
export PATH=$HOME/.cargo/bin/:$PATH
export PATH=$PATH:$HOME/.yarn/bin/

if command -v pyenv 1>/dev/null 2>&1; then
...
```

- ``yarn global add live-server``
- ``yarn global add babel-cli@6.24.1`` # Just to make sure things work

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

# The code

The code is located under the [public](public) folder. I have documented most of it in the code 
itself.

There is a single [public/index.html](public/index.html) which loads the React libraries we will 
be using as well as the periscopai application which is located under [public/scripts/app.js](public/scripts/app.js)