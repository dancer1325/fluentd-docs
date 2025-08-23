# Install by Ruby Gem

* goal
  * how to install Fluentd -- via -- Ruby `gem`

## Steps
### Step 0: Before Installation

* [Pre-installation Guide](before-install.md)

### Step 1: Install Ruby Interpreter

* install 
  * Ruby `>= 2.7`
  * "ruby-dev" package
    * Reason: 🧠build native extension gems🧠

### Step 2: Install Fluentd Gem

```text
$ gem install fluentd --no-doc
$ export PATH="$PATH:$(gem environment | grep "EXECUTABLE DIRECTORY     # add ruby gem | $PATH
```

### Step 3: Run

* `fluentd --setup ./fluent`
  * create Fluentd's sample configuration file "./fluent"

* `fluentd -c ./fluent/fluent.conf -vv`
  * starts Fluentd -- as a -- daemon 
  * `-c ./fluent/fluent.conf`
    * start Fluentd / configuration file | "./fluent/fluent.conf" 
  * `-vv`
    * verbose level / trace
  * `pkill -f fluentd`
    * 👀stop Fluentd daemon👀
  * Problems:
    * Problem1: "adress ... ALREADY in use"
      * Solution: check the process & kill ruby processes

* `echo '{"json":"message"}' | fluent-cat debug.test`
  * Fluentd sends a message '{"json":"message"}' / `debug.test` tag
    * -> Fluentd output the message

        ```text
        2011-07-10 16:49:50 +0900 debug.test: {"json":"message"}
        ```

## notes

* Fluentd gem
  * ❌does NOT come with "/etc/init.d/" scripts❌
    * -> use Process Management tools
      * [`daemontools`](http://cr.yp.to/daemontools.html)
      * [`runit`](http://smarden.org/runit/)
      * [`supervisord`](http://supervisord.org/)
      * [`upstart`](http://upstart.ubuntu.com/)
      * `systemd`
