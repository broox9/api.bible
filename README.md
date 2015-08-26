** This is mainly for the API to the Bible DB, but i'm setting up a connection js module ``public/js/api.bible.connector.js`` that will abstract DB calls from the front end.  may make a ruby module too **

``api.bible.js`` is just there to pull in the connector module and wire up some events so i have a small page to test the API's from

### Server:
Digital Ocean Ubuntu 14.04
30GB / 1GB
~~swapfile 2GB (swapiness=10, vfc_cache_pressure=50)~~
article on swap: https://www.digitalocean.com/community/tutorials/how-to-add-swap-on-ubuntu-14-04
steps on Rbenv install/ Bundler no docs: https://gorails.com/setup/ubuntu/14.04
~~Package managers (PPA, GetDeb, PlayDeb)~~



### Stack:
- Ruby 2.2.0
- ~~RBenv / RBenv-gemset~~
- RVM
- Sinatra
- node 0.10.25
- ~~bower (will remove)~~
- nginx & phusion passenger
- ~~unicorn (unicorn.api_bible.rb)~~
- ~~puma~~
- ~~shotgun (to keep it alive, shotgun --server=Puma --port==3005 config.ru)~~

## DB
- Postgres 9.3
- secrets.yml/database.yaml not checked in
- name: bible_api
- get pgAdmin3 working: https://www.digitalocean.com/community/questions/connect-to-droplet-running-postgresql-9-3-with-pgadmin3


#Repo
- github: api.bible git@github.com:broox9/api.bible.git

# Deployment
Capistrano 3.4.0
