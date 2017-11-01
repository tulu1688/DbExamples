# Install redis docker and expose port 6379
docker run --name redis -p 6379:6379 -d redis

# Run redis-cli from a docker container
docker run -it --link some-redis:redis --rm redis redis-cli -h redis -p 6379
