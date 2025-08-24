# Filter Plugins

* goal
  * Fluentd's Filter Plugins

## Overview

* Filter plugins
  * allows
    * modify event streams
  * use cases
    1. Filtering out events -- by -- grepping >= 1 fields' values
    2. Enriching events -- by -- adding NEW fields
    3. Deleting or masking certain fields -- for -- privacy & compliance

## How To Use

* \+ `<filter>` directive

    ```conf
    <filter matchPattern>
      @type someFilterPlugin
      someFilterPlugin'sParameter
    </filter>
    ```

* [how to write custom filter plugins](../plugin-development/#filter-plugins)

## Filter Chain Optimization

* requirements
  * MULTIPLE filters | pipeline & ALL plugins use the `filter` method & disabled `filter_stream`

* fluentd
  * tries to optimize filter calls / improve the performance

## Filter Plugins

* [`grep`](grep.md)
* [`record_transformer`](record_transformer.md)
* [`filter_stdout`](stdout.md)
