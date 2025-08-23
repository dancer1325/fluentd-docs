# fluentd/Dockerfile

FROM fluent/fluentd:edge-debian
USER root
#install ES plugin
RUN ["gem", "install", "fluent-plugin-elasticsearch", "--no-document", "--version", "5.4.3"]
USER fluent
