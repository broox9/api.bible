require 'rubygems'
# require 'sinatra'
require './bible_server'

set :port, 3005

run Sinatra::Application
