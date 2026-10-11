# docker compose build
docker stop garmion-dev-1
docker compose up -d

# to follow the different servers
# docker compose logs -f | grep --line-buffered '\[flask\]'
docker compose logs -f | grep --line-buffered '\[ionic\]'
docker stop garmion-dev-1