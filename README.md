### Server:
Digital Ocean
20GB / 512MB
swapfile 2GB (swapiness=10, vfc_cache_pressure=50)
article on swap: https://www.digitalocean.com/community/tutorials/how-to-add-swap-on-ubuntu-14-04



### Stack:
- Ruby 2.2.1
- RVM
- Sinatra
- node 0.10.25
- bower (will remove)
- nginx
- unicorn (unicorn.api_bible.rb) //not using
- puma
- shotgun (to keep it alive, shotgun --server=thin --port=6000 config.ru)

## DB
- Postgres 9.3
- secrets.yml/database.yaml not checked in
- name: bible_api
- get pgAdmin3 working: https://www.digitalocean.com/community/questions/connect-to-droplet-running-postgresql-9-3-with-pgadmin3


#Repo
- github: api.bible git@github.com:broox9/api.bible.git

# Deployment
Capistrano 3.4.0
