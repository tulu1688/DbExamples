create keyspace javasampleapproach with replication={'class':'SimpleStrategy', 'replication_factor':1};

use javasampleapproach;
CREATE TABLE customer(
   id int PRIMARY KEY,
   firstname text,
   lastname text,
   age int
);

# Create index on firstname column
CREATE INDEX ON javasampleapproach.customer (firstname);

