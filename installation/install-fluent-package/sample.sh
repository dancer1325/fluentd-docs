#!/bin/bash

curl -X POST -d 'json={"json":"message"}' http://localhost:8888/debug.test
tail -n 1 /var/log/fluent/fluentd.log     # Fluentd's logs
