require 'rubygems'
require 'sinatra'
require 'sinatra/activerecord'
require 'json'
require 'haml'

set :environment, :development
set :public_folder, File.dirname(__FILE__) + '/public'
set :haml, :format => :html5

# development environment settings
ActiveRecord::Base.establish_connection(
    :adapter  => "mysql2",
    :host     => "127.0.0.1",
    :username => "root",
    :password => "",
    :database => "bible"
)

# We will have to see about renaming/remodeling these tables ...
class TKjv < ActiveRecord::Base
end

class KeyEnglish < ActiveRecord::Base
end

class CrossReference < ActiveRecord::Base
end




get "/api/verse/:id" do
  @tkjv.find(params[:id])
end


get "/" do
  haml :index
  #send_file File.expand_path('normal.html', settings.public_folder)
end

