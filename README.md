# trie.js

    [Trie](http://en.wikipedia.org/wiki/Trie) implementation in javascript.
    Developed for fast auto-complete features for web pages. Intended to use with node.js.
    trie.js implementation is based on ternary search tree.

## Installation
 * Install Node.js
 * Install express.js for Node.js
 * clone trie.js

## Running
  $ cd trie.js/lib
  $ node server.js

  RestClient.post 'http://localhost:3000/set', :key => 'hello', :value => "Hello world.." // Add new key to trie
  RestClient.get 'http://localhost:3000/get?q=hel' // Search key starts with hel

## Credit
   Kanwei's [ruby](http://github.com/kanwei/algorithms/blob/master/lib/containers/trie.rb) code for Trie implementation.

    
