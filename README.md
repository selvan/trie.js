# trie.js
    
  Prefix tree data structure to support fast auto-completion.

  trie.js implementation uses [Ternary Search Tree - Trie](http://en.wikipedia.org/wiki/Trie) data structure.

  trie.js can be used as standalone library or could be used with node.js.

## Common usage

    var _trie = new Trie();
    
    _trie.push("Hello", {"id":1, "txt":"Hello World"});
    _trie.push("Hilly", {"id":2, "txt":"Hello Hilly"});
    _trie.push("Hello, brother", {"id":3, "txt":"Whats up?"});
    _trie.push("Hello, bob", {"id":4, "txt":"Hey dude"});

 
    Query 1:
    _trie.wildcard("H*ll.", -1) /* -1 for retrieving all matches, positive integer for limit number of matches */
                                /* Notice support for * and . wildcards */
    Return for Query 1:
    { key : 'Hello', values : {"id":1, "txt":"Hello World"} },
    { key : 'Hilly', values : {"id":2, "txt":"Hello Hilly"} }
        

See [spec/trie_spec.js](https://github.com/selvan/trie.js/blob/master/spec/trie_spec.js) for more usage patterns.               

## Running specs
    npm install
    npm run test

## Credit
   Kanwei's [ruby](http://github.com/kanwei/algorithms/blob/master/lib/containers/trie.rb) code for Trie implementation.

    
