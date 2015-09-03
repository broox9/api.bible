source 'https://rubygems.org'
ruby "2.2.1"


gem 'bundler', '~> 1.10.6'

# database
gem 'pg', '~> 0.18.2'
# gem 'mysql2', '~> 0.3.17'

gem 'sinatra', '~> 1.4.5'
gem 'sinatra-contrib', '~> 1.4.6'

gem 'activerecord', '~> 4.1.8'  #started with active record
#gem 'datamapper', '~> 1.2.0'     #ended with datamapper for multiple DB's
gem 'sinatra-activerecord', '~> 2.0.3'
gem "sinatra-cross_origin", "~> 0.3.1"
gem 'sinatra-assetpack', "~> 0.3.3"

#templates
gem 'multi_json', '~> 1.10.1'
gem 'haml', '~> 4.0.6'

#app server
gem 'puma', '~> 2.11.3'
gem 'shotgun', '~> 0.9.1'
# gem 'unicorn', '~> 4.9.0'
# gem 'thin', '~> 1.6.3'

#configs and junk
gem 'config_for', '~> 0.2.1'

# Deployment
gem 'capistrano', '3.4.0'
gem 'capistrano-bundler', '~> 1.1.2'
# gem 'capistrano-rails', '~> 1.1.1'
gem 'capistrano3-puma'

# Add this if you're using rbenv
gem 'capistrano-rbenv', github: "capistrano/rbenv"


# gem 'sinatra-asset-pipeline', require: 'sinatra/asset_pipeline'
# gem 'uglifier'

source 'https://rails-assets.org' do
  gem 'rails-assets-jquery'
  gem 'rails-assets-underscore'
  gem 'rails-assets-normalize-css'
end


group :test, :development do
  gem "rspec"
end
