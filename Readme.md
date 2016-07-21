
# node-trace

Node tracing library for Sysdig's fantastic [tracers](https://sysdig.com/blog/sysdig-tracers).

## Installation

```
$ npm install --save tj/node-trace
```

## Example

Wrap some code with trace calls:

```
const t = new Trace('some-unique-id')
t.start('request')
await request(...)
t.stop('request')
```

View with csysdig:

```
$ sudo csysdig -v spectro_traces
```

Profit:

![](https://drops.azureedge.net/drops/files/acc_494541/1iTyu?sr=b&sp=r&sv=2014-02-14&st=2016-07-21T20%3A05%3A23Z&se=2016-07-21T21%3A05%3A23Z&rscd=inline%3B+filename%3Dscreen.png&sig=B85SAc4I%2FBZNFbgwN0zossxD9Ife3fNcD9f3B2LBOU0%3D)

## Links

- https://sysdig.com/blog/sysdig-tracers
- https://github.com/draios/sysdig/wiki/Tracers

## Badges

![](https://img.shields.io/badge/license-MIT-blue.svg)
![](https://img.shields.io/badge/status-stable-green.svg)
[![](http://apex.sh/images/badge.svg)](https://apex.sh/ping/)
