# Parser Plugins

* goal
  * Fluentd's Parser Plugin

## Overview

* uses
  * ⚠️| input plugins⚠️
    * _Example:_ | [`in_tail`](../input/tail.md), [`in_syslog`](../input/syslog.md), [`in_tcp`](../input/tcp.md), [`in_udp`](../input/udp.md)
    * ❌can NOT parse the user's custom data format❌
      * _Example:_ a context-dependent grammar / can NOT be parsed -- with a -- regular expression
      * -> create OWN parser formats

* [how to write a CUSTOM parser plugin](../plugin-development/api-plugin-parser.md)

## Built-in parsers

* [`regexp`](regexp.md)
* [`apache2`](apache2.md)
* [`apache_error`](apache_error.md)
* [`nginx`](nginx.md)
* [`syslog`](syslog.md)
* [`csv`](csv.md)
* [`tsv`](tsv.md)
* [`ltsv`](ltsv.md)
* [`json`](json.md)
* [`msgpack`](msgpack.md)
* [`multiline`](multiline.md)
* [`none`](none.md)

### Third-party Parsers

* [`grok`](https://github.com/fluent/fluent-plugin-grok-parser)
  * `grok-parser` plugin is useful
  * if you use `fluentd` v0.14/v1.0 -> use `> 1.0.0` versions 

* [`multi-format-parser`](https://github.com/repeatedly/fluent-plugin-multi-format-parser)
  * uses
    * parse MULTIPLE formats | 1 data stream

* [`protobuf`](https://github.com/fluent-plugins-nursery/fluent-plugin-parser-protobuf)

* [`avro`](https://github.com/fluent-plugins-nursery/fluent-plugin-parser-avro)

## Core input plugins / parser support

* [`in_tail`](../input/tail.md)
* [`in_tcp`](../input/tcp.md)
* [`in_udp`](../input/udp.md)
* [`in_syslog`](../input/syslog.md)
* [`in_http`](../input/http.md)
