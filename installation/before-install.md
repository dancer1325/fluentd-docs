# Before Installation

* 👀ALL are recommendations👀

## Set up NTP daemon | node

* NTP
  * == Network Time Protocol
* _Example:_ 
  * [`chrony`](https://chrony.tuxfamily.org/), 
  * `ntpd`,
  * [AWS-hosted NTP server](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/set-time.html) 
* allows
  * 👀have an accurate current timestamp👀
    * ⚠️crucial | ALL production-grade logging services⚠️

## Increase the MAXIMUM number of File Descriptors

* `ulimit -n`
  * check the existing configuration
  * recommendations
    * > 1024

* steps
  * ways
    * add 

      ```.conf, title=/etc/security/limits.conf
      root soft nofile 65536
      root hard nofile 65536
      * soft nofile 65536
      * hard nofile 65536
      ```
    * if you are running fluentd | `systemd` -> set `LimitNOFILE=65536`   
  * reboot your machine

## Optimize the Network Kernel Parameters

* goal
  * MULTIPLE Fluentd instances / high load environments

* steps
  * add 
    ```.conf,title=/etc/sysctl.conf
    net.core.somaxconn = 1024
    net.core.netdev_max_backlog = 5000
    net.core.rmem_max = 16777216
    net.core.wmem_max = 16777216
    net.ipv4.tcp_wmem = 4096 12582912 16777216
    net.ipv4.tcp_rmem = 4096 12582912 16777216
    net.ipv4.tcp_max_syn_backlog = 8096
    net.ipv4.tcp_slow_start_after_idle = 0
    net.ipv4.tcp_tw_reuse = 1
    net.ipv4.ip_local_port_range = 10240 65535
    # If forward uses port 24224, reserve that port number for use as an ephemeral port.
    # If another port, e.g., monitor_agent uses port 24220, add a comma-separated list of port numbers.
    # net.ipv4.ip_local_reserved_ports = 24220,24224
    net.ipv4.ip_local_reserved_ports = 24224
    ```
    * see [How Netflix Tunes EC2 Instances for Performance](https://www.slideshare.net/brendangregg/how-netflix-tunes-ec2-instances-for-performance)
  * `sysctl -p` OR reboot your node

## Use sticky bit symlink/hardlink protection

* requirements
  * OS
    * CentOS 7+, OR
    * Ubuntu 18.04+ OR
    * Debian GNU/Linux 10+

* "/etc/sysctl.d/10-link-restrictions.conf" OR "/usr/lib/sysctl.d/50-default.conf"
  * protections' default settings 

* symlink attack protection
  * MUST have

    ```text
    fs.protected_hardlinks = 1
    fs.protected_symlinks = 1
    ```

* `sysctl -p`
  * reboot your node


## [jemalloc](http://www.canonware.com/jemalloc/)

* use cases
  * large deployments
* avoid
  * memory fragmentation
* ALREADY included |
  * [`rpm`](install-fluent-package/install-by-rpm-fluent-package.md) packages
  * [`deb`](install-fluent-package/install-by-deb-fluent-package.md) packages
