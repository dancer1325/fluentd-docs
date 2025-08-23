# Install `fluent-package` by .dmg Package \(macOS\)

* goal
  * how to install `fluent-package` dmg packages' stable versions

## How to install `fluent-package`

* ❌NOT YET shipped | homebrew ecosystem❌

### Step 1: Install `fluent-package`

* [downoad fluent-package v5](https://td-agent-package-browser.herokuapp.com/5/macosx)
  * ❌NOT found❌
    * Solution: 👀use [Ruby](../install-by-gem.md)👀

### Step 2: Launch Fluentd -- via -- 

* -- via -- `launchctl`

    ```text
    $ sudo launchctl load /Library/LaunchDaemons/fluentd.plist          # launch Fluentd
    $ less /var/log/fluent/fluentd.log                                  # check Fluentd's logs
    2023-08-01 16:55:03 -0700 [info]: starting fluentd-1.16.2
    2023-08-01 16:55:03 -0700 [info]: reading config file path="/etc/fluent/fluentd.conf"
    ```

  * if you want to stop

      ```text
      $ sudo launchctl unload /Library/LaunchDaemons/fluentd.plist
      ```
