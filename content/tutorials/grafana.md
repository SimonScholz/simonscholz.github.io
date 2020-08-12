---
path: '/tutorials/grafana'
date: '2020-08-05'
title: 'Grafana'
description: 'Setting up dashboards for monitoring applications.'
author: 'Simon Scholz'
tags: ['Grafana', 'Monitoring']
---

# Pie Chart

Use the grafana-cli tool to install Pie Chart from the commandline:

```shell
grafana-cli plugins install grafana-piechart-panel
```

TIP: Grafana Docker image has to be restarted to make use of the grafana-piechart-panel.

# Sources

- https://grafana.com/grafana/plugins/grafana-piechart-panel/installation
