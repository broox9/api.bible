require 'rubygems'
require 'sinatra'
require 'sinatra/activerecord'
require 'json'
require 'haml'

### Development environment settings ##########
set :environment, :development
set :public_folder, File.dirname(__FILE__) + '/public'
set :haml, :format => :html5

### DATABASE ##########
ActiveRecord::Base.establish_connection(
    :adapter  => "mysql2",
    :host     => "127.0.0.1",
    :username => "root",
    :password => "",
    :database => "bible"
)



### MODELS ##########
# We will have to see about renaming/remodeling these tables ...
class TKjv < ActiveRecord::Base
  self.table_name = "t_kjv"
end

class KeyEnglish < ActiveRecord::Base
  self.table_name ="key_english"
end

class CrossReference < ActiveRecord::Base
  self.table_name ="cross_reference"
end



### ROUTING ##########
get "/api/verse/:id" do
  verse = TKjv.find(params[:id])
  content_type :json
  verse.to_json
end


get "/" do
  @bible = TKjv.all()
  haml :index
  #send_file File.expand_path('normal.html', settings.public_folder)
end

