fs = require 'fs'
{puts} = require 'sys'
{spawn} = require 'child_process'

option '-w', '--watch', 'watch script for changes, and recompile'
buildTasks =
  lib:
    description:
      'build library'
    sources: ['src/siesta.coffee']
    outputfile:
      'lib/siesta.js'

buildTests =
  github:
    description:
      'build github example'
    sources: [ 'examples/coffee/github.siesta.coffee' ]
    outputfile:   'examples/js/github.siesta.js'

build = (outputfile, sources, watch = false) ->
  arg = ['--compile', '--join'].concat(outputfile).concat(sources)

  compile = ->
    coffee = spawn 'coffee', arg
    coffee.stdout.on 'data', (data) ->
      puts data
    coffee.stderr.on 'data', (data) ->
      puts data

  puts "#{(new Date).toLocaleTimeString()} - compiled #{outputfile}"
  compile()

  if watch
    for source in sources
      fs.watchFile source, {persistent: true, interval: 500}, (curr, prev) ->
        return if curr.mtime.getTime() is prev.mtime.getTime()
        puts "#{(new Date).toLocaleTimeString()} - compiled #{outputfile} (updated #{source})"
        compile()
  return

task "build", "build all", (options) ->
  build buildTask.outputfile, buildTask.sources, options.watch? for own taskName, buildTask of buildTests
  build buildTask.outputfile, buildTask.sources, options.watch? for own taskName, buildTask of buildTasks
  return

for own taskName, buildTask of buildTasks
  task "build:#{taskName}", buildTask.description, (options) ->
    build buildTask.outputfile, buildTask.sources, options.watch?

task "clean", "cleanup", (options) ->
  arg = ['-f'].concat(buildTask.outputfile for own taskName, buildTask of buildTasks)
  rm = spawn 'rm', arg
  return

###
tasks for testing ??
docco
https://github.com/jashkenas/coffee-script/blob/master/Cakefile
###