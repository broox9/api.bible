# require 'rubygems'
require 'sinatra'
require 'sinatra/base'
require 'sinatra/activerecord'
require 'sinatra/cross_origin'
require 'sinatra/assetpack'
# require 'sprockets'
# require 'sprockets-helpers'
require 'json'
require 'haml'


# class BibleServer < Sinatra::Base  ### Development environment settings ##########

  # register Sinatra::ActiveRecordExtension
  # register Sinatra::CrossOrigin
  # register Sinatra::AssetPack
  # register Sinatra::AssetPipeline
  
  set :environment, ENV['RACK_ENV']
  set :logging, true
  set :root, File.dirname(__FILE__)
  set :app_file, __FILE__
  set :public_folder, File.dirname(__FILE__) + '/public'
  set :haml, :format => :html5

  require './config/environments.rb'

  # set :allow_origin, :any
  # set :allow_methods, [:get, :post, :options]
  # set :allow_credentials, true
  # set :max_age, "1728000"
  # set :expose_headers, ['Content-Type']

  # TODO Move to environments.rb / production
  assets do
    js :libs, [
      '/assets/lib/jquery/dist/jquery.min.js',
      '/assets/lib/lodash/dist/lodash.min.js'
    ]

    js :application, [
      '/assets/js/api.bible.connector.js',
      '/assets/js/api.bible.js'
    ]

    css :bundle, [
      '/assets/lib/normalize.css/normalize.css',
      '/assets/css/app.css'
    ]

    js_compression :jsmin
    css_compression :simple
  end


  ### MODELS ##########
  # We will have to see about renaming/remodeling these tables ...
  class BaseBible < ActiveRecord::Base
    # self.table_name = "t_kjv"
    # self.table_name = "t_bbe"
    # self.table_name = "t_web"
    self.table_name = "bible_en_verses"
  end

  class DetailBible < ActiveRecord::Base
    self.table_name = "bible_en"
  end

  ## other translations can be called something else but KJV is the base
  class KeyEnglish < ActiveRecord::Base
    self.table_name ="key_english"
  end

  class CrossReference < ActiveRecord::Base
    self.table_name ="cross_reference"
  end





  ### ROUTING ##########
  get "/api/booklist" do
    key_english = KeyEnglish.all()
    cross_origin
    content_type :json
    key_english.to_json
  end

  get "/api/bible" do
    bible = BaseBible.all()
    cross_origin
    content_type :json
    bible.to_json
  end


  get "/api/advanced/verse/:verse_id" do
    verse = DetailBible.where(['verseid = :v_id', {v_id: params[:verse_id]} ]).order(:lang_order)
    content_type :json
    verse.to_json
  end

  get "/api/simple/verse/:verse_id" do
    verse = BaseBible.find_by(verseid: params[:verse_id])
    content_type :json
    verse.to_json
  end

  get "/api/advanced/chapter/:book/:chapter" do
    chapter = DetailBible.where(['book = :book AND chapter = :chapter', {book: params[:book], chapter: params[:chapter]} ]).order(:lang_order)
    sorted_chapter = chapter.group_by { |v| v.verseID}
    content_type :json
    sorted_chapter.to_json
  end

  get "/api/simple/chapter/:book/:chapter" do
    chapter = BaseBible.where(book: params[:book], chapter: params[:chapter]).order(:verse)
    content_type :json
    chapter.to_json
  end


  get "/api/book_chapters/:book" do
    bookNumber = params[:book] || 1
    book_count = BaseBible.where(book: params[:book]).count
    content_type :json
    book_count.to_json
  end

  get "/api/book/:book" do
    bookNumber = params[:book] || 1
    book = BaseBible.where(book: params[:book])
    content_type :json
    book.to_json
  end

  get "/api/passage/:start/:end" do
    passage = BaseBible.where(id: params[:start] .. params[:end] )
    content_type :json
    passage.to_json
  end

  get "/" do
    # @bible = BaseBible.all()
    haml :index
    #send_file File.expand_path('normal.html', settings.public_folder)
  end
# end
