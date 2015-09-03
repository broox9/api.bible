#The environment variable DATABASE_URL should be in the following format:
# => postgres://{user}:{password}@{host}:{port}/path

require 'sinatra/activerecord'

configure :development do
	set :port, 3005
end

# configure :production do
# 		set :port, 8080
# end

configure :production, :development do
	set :port, 3005
	db = YAML.load_file("#{File.dirname(__FILE__)}/secrets.yml")[ENV['RACK_ENV']]['db_config']
	# db_config = URI.parse(ENV['DATABASE_URL'] || 'postgres://localhost/Bible_Api') # HEROKU
	# db_config = URI.parse("#{db['adapter']}://#{db['user']}:#{db['password']}@#{db['host']}/#{db['database']}")
	# puts "~~~~~~ DB -> #{db_config.to_yaml}"

	ActiveRecord::Base.establish_connection(
			:adapter => db['adapter'],
			:host     => db['host'],
			:username => db['user'],
			:password => db['password'],
			:database => db['database'],
			:encoding => 'utf8'
	)
end
