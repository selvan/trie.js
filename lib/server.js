require.paths.push(".");

var express = require('express');
var trie = require('trie');

var cache = new trie.Trie();

var app = express.createServer(
   express.logger(),
   express.bodyDecoder()
);

app.get('/get', function(req, res){
    var q = req.query.q + "*****" /* find next 5 letters */    
    var result = cache.wildcard(q);
    console.log(result);
    res.send(result);
});

app.post('/set', function(req, res){
    console.log(req.body);
    var keys = req.body.key;
    var value = req.body.value;
    for(var i=0;i<keys.length;i++) {
        cache.push(keys[i], value);
        console.log("key is " + keys[i] + " and value is " + value);
    }
    res.send("ok");
});

app.listen(3000);
