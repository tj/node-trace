
const streams = require('memory-streams')
const assert = require('assert')
const Trace = require('./')

describe('Trace(id)', function() {
  it('should default the stream', function() {
    const t = new Trace('foobar')
    assert(t.id == 'foobar')
    assert(t.stream)
  })
})

describe('Trace(id, stream)', function() {
  it('should override the stream', function() {
    const s = {}
    const t = new Trace('foobar', s)
    assert(t.stream == s)
  })
})

describe('Trace#start(tags)', function() {
  it('should write to the stream', function() {
    const stream = new streams.WritableStream
    const t = new Trace('foobar', stream)
    t.start('foo')
    t.start('bar')
    assert(stream.toString() == '>:foobar:foo::>:foobar:bar::')
  })
})

describe('Trace#stop(tags)', function() {
  it('should write to the stream', function() {
    const stream = new streams.WritableStream
    const t = new Trace('foobar', stream)
    t.stop('foo')
    t.stop('bar')
    assert(stream.toString() == '<:foobar:foo::<:foobar:bar::')
  })
})

describe('Trace#start(tags, args)', function() {
  it('should write to the stream with serialized args', function() {
    const stream = new streams.WritableStream
    const t = new Trace('foobar', stream)
    t.start('foo', { name: 'tobi', species: 'ferret' })
    assert(stream.toString() == '>:foobar:foo:name=tobi,species=ferret:')
  })
})

describe('Trace#stop(tags, args)', function() {
  it('should write to the stream with serialized args', function() {
    const stream = new streams.WritableStream
    const t = new Trace('foobar', stream)
    t.stop('foo', { name: 'tobi', species: 'ferret' })
    assert(stream.toString() == '<:foobar:foo:name=tobi,species=ferret:')
  })
})

describe('Trace', function() {
  it('should escape args', function() {
    const stream = new streams.WritableStream
    const t = new Trace('foobar', stream)
    t.start('foo', { name: 'tobi.ferret' })
    assert(stream.toString() == '>:foobar:foo:name=tobi\\.ferret:')
  })
})
