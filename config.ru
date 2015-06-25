require 'rubygems'
require 'sinatra'
require './bible_server'

require File.expand_path './bible_server.rb', __FILE__

run Sinatra::Application
