# Config: Common Parameters

* == parameters / AVAILABLE | 👀ALL OR SOME Fluentd plugins👀

## AVAILABLE | ALL Plugins

### `@type`

* == type of the plugin

```.conf
<source>
  @type my_plugin_type
</source>

<filter>
  @type my_filter
</filter>
```

### `@id`

* == configuration's unique name
* uses
  * paths -- for --
    * buffer,
    * storage,
    * logging
    * ...

    ```text
    <match>
      @type file
      @id service_www_accesslog
      path /path/to/my/access.log
      # ...
    </match>
    ```
  * if you want to enable `root_dir` feature GLOBALLY -> specify `@id` | ALL plugins 

* see [System Configuration](../deployment/system-config.md)

### `@log_level`

* == ⚠️plugin-specific⚠️ logging level
  * by default,
    * `info`
  * override GLOBAL log leve | plugin

* ways to set GLOBAL log level
  * `log_level` | `<system>` section OR
  * `-v/-q` CL arguments

* uses
  * debugging

* see [logging article](../deployment/logging.md)

## Plugin Parameters / Emit Events

### `@label`

* allows
  * 👀input events are routed --  to -- `<label>` sections👀
  * complex configuration is made
    * modular
    * simple

```.conf
<...>
  @label @someValue             # @ as prefix, MANDATORY | value 
</...>
```
