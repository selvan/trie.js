require.paths.push(".");

var express = require('express');
var trie = require('trie');

var cache = new trie.Trie();

var app = express.createServer(
   express.logger(),
   express.bodyDecoder()
);

app.get('/get', function(req, res){
    var q = req.query.q
    console.log(q);
    var result = cache.starts_with(q, 30);
    console.log(result);
    res.header('Content-Type', "application/json; charset=utf-8");
    res.send(result);
});

app.post('/set', function(req, res){
    console.log(req.body);
    var keys = req.body.keys;
    var value = req.body.value;
    for(var i=0;i<keys.length;i++) {
        cache.push(keys[i], value);
        console.log("pushed - key : " + keys[i] + " and value : " + value);
    }
    res.send("ok");
});

app.get('/stat', function(req, res){
    res.send("Total number of keys : " +cache.count());
});

app.listen(3300);
