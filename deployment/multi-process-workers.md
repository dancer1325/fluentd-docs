# Multi Process Workers

* goal
  * Fluentd's multi-process workers

* allows
  * use MULTIPLE CPU powers 
* use case
  * high traffic
* == replace `fluent-plugin-multiprocess` (TODO: ❓)

## How It Works

* worker
  * == 👀input/filter/output plugins👀

* 1 `fluentd` instance
  * by default,
    * launches 1 supervisor + 1 worker
  * if you set **multi-process workers**
    * launch 👀MULTIPLE workers + 1 separate process / worker👀

      ![Multi-process Workers](../.gitbook/assets/multi-process-workers%20%281%29%20%281%29.png)

## Configuration

### `workers` Parameter

* ALLOWED |
  * [`<system>` directive](../configuration/config-file.md)

### `<worker>` == `<worker N>` directive

* uses
  * plugins / NOT work AUTOMATICALLY with MULTI-process workers
    * _Example:_ `in_tail`

* `N`
  * == zero-based worker index

* see [`<worker>`](../configuration/config-file.md#6-worker)

### `<worker N-M>` directive

* requirements
  * Fluentd v1.4.0

* see [`<worker>`](../configuration/config-file.md#6-worker)

## Operation

* EACH worker
  * consumes SEPARATELY memory & disk space 

## Multi-Process Workers and Plugins

### Input Plugin

There are three \(3\) types of input plugins:

* feature supported and server helper based plugin
* feature supported and plain plugin
* feature unsupported

#### feature supported and server helper based plugin

Server plugin helper based plugin can share port between workers
* For example, `forward` input plugin does not need multiple ports on multi process workers
* `forward` input's port is shared among workers.

```text
<system>
  workers 4
</system>

<source>
  @type forward
  port 24224 # 4 workers accept events on this port
</source>
```

#### feature supported and plain plugin

Non-server plugin helper based plugin set up socket/server in each worker
* For example, `monitor_agent` needs multiple ports on multi-process workers
* The port is assigned sequentially.

```text
<system>
  workers 4
</system>

<source>
  @type monitor_agent
  port 25000 # worker0: 25000, worker1: 25001, ...
</source>
```

#### feature unsupported

Some plugins do not work on multi-process workers
* For example, `tail` input does not work because `in_tail` cannot be implemented with multi process.

You can run these plugins with `<worker N>` directive
* See "Configuration" section.

### Output Plugin

By default, no additional changes are required but some plugins do need to specify the `worker_id` in the configuration
* For example, `file` and `S3` plugins store events into a specified path
* The problem is if the plugins under multi-process workers flush events at the same time, the destination path is also the same which results in data loss
* To avoid this problem, a `worker_id` or some random string can be configured.

```text
# s3 plugin example

<match pattern>
  @type s3

  # Good
  path "logs/#{worker_id}/${tag}/%Y/%m/%d/"

  # Bad on multi process worker!
  path logs/${tag}/%Y/%m/%d/
</match>
```

See [Configuration File](../configuration/config-file.md#embedded-ruby-code) article for embedded Ruby code feature.

## FAQ

### Fluentd cannot start with multi-process workers, why?

You may see following error in the fluentd logs:

```text
2018-10-01 10:00:00 +0900 [error]: config error file="/path/to/fluentd.conf" error_class=Fluent::ConfigError error="Plugin 'tail' does not support multi workers configuration (Fluent::Plugin::TailInput)"
```

This means that the configured plugin does not support multi-process workers
* All configured plugins must support multi-process workers
* See "Multi-Process Worker and Plugins" section above.
