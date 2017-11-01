var redis = require('redis');
var client = redis.createClient(); //creates a new client

client.on('connect', function() {
    console.log('connected');
});

// # Storing Key-Value Pairs

// ## Storing Strings
client.set('framework', 'AngularJS');
client.set(['framework_1', 'AngularJS_1']);
client.set('framework_2', 'AngularJS_2', function(err, reply) {
    console.log('\n===> Set K/V function');
    console.log(reply);
});

client.get('framework_2', function(err, reply) {
    console.log('\n===> Get K/V function');
    console.log(reply);
});

// ## Storing hash
/* First option */
client.hmset('frameworks', 'javascript', 'AngularJS', 'css', 'Bootstrap', 'node', 'Express');

client.hgetall('frameworks', function(err, object) {
    console.log('\n===> Hget all function');
    console.log(object);
});

/* Second option */
client.hmset('frameworks_1', {
    'javascript': 'AngularJS',
    'css': 'Bootstrap',
    'node': 'Express'
});

client.hget('frameworks_1', 'css', function(err, object) {
    console.log('\n===> Hget function');
    console.log(object);
});


// ## Storing Lists
/*
  Store list of items
  creates a list called frameworks and pushes two elements to it
*/
client.rpush(['list_frameworks', 'angularjs', 'backbone'], function(err, reply) {
    console.log('\n===> Rpush list function');
    console.log(reply); //prints 2
});

client.lpush(['list_frameworks', 'angularjs_left', 'backbone_left'], function(err, reply) {
    console.log('\n===> Lpush list function');
    console.log(reply); //prints 2
});

client.lrange('list_frameworks', 0, -1, function(err, reply) {
    console.log('\n===> list range');
    console.log(reply); // ['angularjs', 'backbone']
});

// ## Storing Sets
/* Sets are similar to lists, but the difference is that they don’t allow duplicates */
client.sadd(['tags', 'angularjs', 'backbonejs', 'emberjs'], function(err, reply) {
    console.log('\n===> set add');
    console.log(reply); // 3
});

client.smembers('tags', function(err, reply) {
    console.log('\n===> get set members');
    console.log(reply);
});


// # Checking the Existence of Keys
client.exists('key', function(err, reply) {
    console.log('\n===> Checking the Existence of Keys');
    if (reply === 1) {
        console.log('exists');
    } else {
        console.log('doesn\'t exist');
    }
});

// # Deleting and Expiring Keys
client.del('frameworks', function(err, reply) {
    console.log('\n===> Deleting keys');
    console.log(reply);
});

// # Give an expiration time to an existing key
client.set('key', 'val1');
client.expire('key', 30);

// # Incrementing and Decrementing
client.set('key1', 10, function() {
    client.incr('key1', function(err, reply) {
        console.log('\n===> Incrementing key');
        console.log(reply); // 11

        client.decr('key1', function(err, reply) {
            console.log('\n===> Decrementing key');
            console.log(reply); // 10
        });
    });
});

client.set('key2', 10, function() {
    client.incrby('key2', 10, function(err, reply) {
        console.log('\n===> Increase by function');
        console.log(reply); // 20

        console.log('\n===> Decrease by function');
        client.decrby('key2', 10, function(err, reply) {
            console.log(reply); // 10
        });
    });
});
