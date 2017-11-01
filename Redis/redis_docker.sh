# Remove old `redis` container
echo "===== Stop old redis container ====="
docker stop redis
echo "===== Remove old redis container ====="
docker rm redis

# Install redis docker and expose port 6379
echo "===== Install new redis container ====="
docker run --name redis -p 6379:6379 -d redis

# Run redis-cli from a docker container
echo "===== Run redis-cli in new docker container ====="
echo "... type \"exit\" to quit"
docker run -it --link redis:redis --rm redis redis-cli -h redis -p 6379
