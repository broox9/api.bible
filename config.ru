require 'rubygems'
require 'sinatra'
require './bible_server'

require File.expand_path './bible_server.rb', __FILE__

set :port, 3005

run Sinatra::Application
