#!/usr/bin/ruby
require 'json'

f = JSON(File.open(ARGV[0]).read)
r = {}
f.each{|i| r[i["District"].to_i] = i }
File.write(ARGV[0], r.to_json)
