
const fs = require('fs')

/**
 * Default write stream.
 */

const defaultStream = fs.createWriteStream('/dev/null', { highWaterMark: 0 })

/**
 * Expose `Trace`.
 */

module.exports = class Trace {

  /**
   * Initialize with `id` and optional `stream`.
   */

  constructor(id, stream = defaultStream) {
    this.id = id
    this.stream = stream
  }

  /**
   * Start trace.
   */

  start(tags, args) {
    this.stream.write(formatTrace('>', this.id, tags, args))
  }

  /**
   * Stop trace.
   */

  stop(tags, args) {
    this.stream.write(formatTrace('<', this.id, tags, args))
  }
}

/**
 * Trace.
 */

function formatTrace(dir, id, tags, args) {
  return `${dir}:${id}:${tags}:${formatArgs(args)}:`
}

/**
 * Arguments.
 */

function formatArgs(args) {
  if (!args) return ''
  return Object.keys(args).map(k => formatArg(k, args[k])).join(',')
}

/**
 * Argument.
 */

function formatArg(k, v) {
  return `${escape(k)}=${escape(v)}`
}

/**
 * Escape.
 */

function escape(s) {
  return s
    .replace(/\./g, '\\.')
    .replace(/\,/g, '\\,')
    .replace(/\=/g, '\\=')
}
