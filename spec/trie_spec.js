require.paths.push("../lib");
var trie = require('trie');

describe("empty trie", function() {
    var _trie;
    beforeEach(function() {
        _trie = new trie.Trie();
    });

    it('get should return null', function() {
        expect(_trie.get("abc")).toBeNull();
    });

    it('wildcard should return an empty array', function() {
        expect(_trie.wildcard("abc")).toEqual([]);
    });

    it('starts_with should return an empty array', function() {
        expect(_trie.starts_with("abc")).toEqual([]);
    });
});

describe("non-empty trie", function() {
    var _trie;
    beforeEach(function() {
        _trie = new trie.Trie();
        _trie.push("Hello", "World");
        _trie.push("Hilly", "World");
        _trie.push("Hello, brother", "World");
        _trie.push("Hello, bob", "World");
    });

    it("should get valid values", function() {
        expect(_trie.get("Hello")).toEqual("World");
        expect(_trie.get("Hello, brother")).toEqual("World");
    });

    it("should overwrite values", function() {
        _trie.push("Hello", "John");
        expect(_trie.get("Hello")).toEqual("John");
    });

    it("should match wildcards", function () {
        expect(_trie.wildcard("H*ll.")).toEqual([
            { key : 'Hilly', value : 'World' },
            { key : 'Hello', value : 'World' }
        ]);
        expect(_trie.wildcard("Hel")).toEqual([])
    });

    it("should match starts_with", function() {
        expect(_trie.starts_with("xyz")).toEqual([]);
        expect(_trie.starts_with("He")).toEqual([
            { key : 'Hello', value : 'World' },
            { key : 'Hello, bob', value : 'World' },
            { key : 'Hello, brother', value : 'World' }
        ]);

        expect(_trie.starts_with("Hi")).toEqual([
            { key : 'Hilly', value : 'World' }
        ]);

        expect(_trie.starts_with("H")).toEqual([
            { key : 'Hilly', value : 'World' },
            { key : 'Hello', value : 'World' },
            { key : 'Hello, bob', value : 'World' },
            { key : 'Hello, brother', value : 'World' }
        ]);
    });
});

