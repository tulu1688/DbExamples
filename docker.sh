docker run --name cassandra1 -m 1g -d -p 9042:9042 cassandra:3.0.4
node1_ip=$(docker inspect --format='{{ .NetworkSettings.IPAddress }}' cassandra1)
docker run -it --link cassandra1 --rm cassandra:3.0.4   sh -c "'exec cqlsh "$node1_ip"'"
docker run --name cassandra2 -m 1g -d -e CASSANDRA_SEEDS="$(docker inspect --format='{{ .NetworkSettings.IPAddress }}' cassandra1)" cassandra:3.0.4
docker run -it --link cassandra1 --rm cassandra:3.0.4   sh -c 'exec cqlsh 172.17.0.4'
