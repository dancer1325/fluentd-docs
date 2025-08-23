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

* TODO: This parameter specifies the plugin-specific logging level. The default log level is `info`. Global log level can be specified by setting `log_level` in `<system>` section or with `-v/-q` command line arguments. The `@log_level` parameter overrides the logging level only for the specified plugin instance.

```text
<system>
  log_level info
</system>

<source>
  # ...
  @log_level debug # shows debug log only for this plugin
</source>
```

The main purposes of this parameter are:

1. to suppress too many logs for that plugin; and,
2. to show the debug logs to help in the debugging process.

Please see the [logging article](../deployment/logging.md) for further details.

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
