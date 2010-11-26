# trie.js
  [Trie](http://en.wikipedia.org/wiki/Trie) implementation in javascript.
  Developed to support fast auto-complete features. This implementation uses ternary search tree algorithm.
  trie.js can be used as standalone library or could be used with node.js.
  trie_spec.js spec lists most of the common usage pattern.

## Installation with node.js
 * Install jode.js
 * Install express.js
 * clone trie.js

## Running
  $ cd trie.js/lib
  $ node server.js

## Example
  sudo gem install rest-client

  require 'rubygems'
  require 'rest_client'
  
  RestClient.post 'http://localhost:3300/set', {:keys => ["bonjour", "ahoj", "hej", "hallo"], :value => {:id=>1, :txt => "Welcome ", :desc => "Greetings in english"}}
  RestClient.get 'http://localhost:3300/get?q=h'
  RestClient.get 'http://localhost:3300/stat'

## Credit
   Kanwei's [ruby](http://github.com/kanwei/algorithms/blob/master/lib/containers/trie.rb) code for Trie implementation.

    
