# Docker Compose

* goal
  * how to 
    * collect Apache HTTP server daemon (`httpd`) logs
    * propagate Docker logs -- to -- EFK (Elasticsearch + Fluentd + Kibana) stack

* approach
  * 4 containers
    * [Apache HTTP Server](https://hub.docker.com/_/httpd/)
    * [Fluentd](https://hub.docker.com/r/fluent/fluentd/)
    * [Elasticsearch](https://hub.docker.com/_/elasticsearch/)
    * [Kibana](https://hub.docker.com/_/kibana/)

## Prerequisites: Docker

* [Docker Installation](https://docs.docker.com/engine/installation/)

## Step 0: Create ["docker-compose.yml"](example/viaDockerCompose/docker-compose.yml)

* `logging`
  * [services' attribute](https://docs.docker.com/reference/compose-file/services/#logging)
  * == [Docker Fluentd Logging Driver](https://docs.docker.com/engine/admin/logging/fluentd/)
  * 👀ALL `web` container's logs are AUTOMATICALLY forwarded -- , thanks to `logging.options.fluentd-address`, to -- `host:port`👀

## Step 1: Create Fluentd Image + Config + Plugin

* [Dockerfile](example/viaDockerCompose/fluentd/Dockerfile)
* [Fluentd configuration file](example/viaDockerCompose/fluentd/conf/fluent.conf)
  * [`forward`](../input/forward.md) input plugin
    * receives logs -- from -- Docker logging driver
  * `elasticsearch` output plugin
    * forwards these logs -- to -- Elasticsearch
    * see
      * [Elasticsearch parameters section](../output/elasticsearch.md#parameters)
      * [fluent-plugin-elasticsearch](https://github.com/uken/fluent-plugin-elasticsearch)

## Step 2: Start the Containers

```text
$ docker compose up --detach
```

Use `docker ps` command to verify that the four \(4\) containers are up and running:

```text
$ docker ps
CONTAINER ID   IMAGE                                                  COMMAND                   CREATED          STATUS                    PORTS                                                                                                    NAMES
7a489886d856   httpd                                                  "httpd-foreground"        36 seconds ago   Up 14 seconds             0.0.0.0:8080->80/tcp, [::]:8080->80/tcp                                                                  fluentd-elastic-kibana-web-1
36ded62da733   fluentd-elastic-kibana-fluentd                         "tini -- /bin/entryp…"    36 seconds ago   Up 15 seconds             5140/tcp, 0.0.0.0:24224->24224/tcp, 0.0.0.0:24224->24224/udp, :::24224->24224/tcp, :::24224->24224/udp   fluentd-elastic-kibana-fluentd-1
254b7692966f   docker.elastic.co/kibana/kibana:8.17.1                 "/bin/tini -- /usr/l…"    36 seconds ago   Up 15 seconds             0.0.0.0:5601->5601/tcp, :::5601->5601/tcp                                                                fluentd-elastic-kibana-kibana-1
187d3e5c2e08   docker.elastic.co/elasticsearch/elasticsearch:8.17.1   "/bin/tini -- /usr/l…"    37 seconds ago   Up 35 seconds (healthy)   0.0.0.0:9200->9200/tcp, :::9200->9200/tcp, 9300/tcp                                                      elasticsearch
```

## Step 3: Generate `httpd` Access Logs

Use `curl` command to generate some access logs like this:

```text
$ curl http://localhost:8080/
<html><body><h1>It works!</h1></body></html>
```

## Step 4: Confirm Logs from Kibana

Browse to [`http://localhost:5601/app/discover#/`](http://localhost:5601/app/discover#/) and create data view.
![Kibana Discover](../.gitbook/assets/8.17_efk-kibana-discover-start-page.png)

Specify `fluentd-*` to `Index pattern` and click `Save data view to Kibana`.
![Kibana Discover](../.gitbook/assets/8.17_efk-kibana-create-data-view.png)

Then, go to `Discover` tab to check the logs. As you can see, logs are properly collected into the Elasticsearch + Kibana, via Fluentd.

![Kibana Discover](../.gitbook/assets/8.17_efk-kibana-discover.png)
