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

        /* Fetch all */
        expect(_trie.wildcard("H*ll.", -1)).toEqual([
            { key : 'Hello', value : 'World' },
            { key : 'Hilly', value : 'World' }
        ]);

        /* Fetch 2 */
        expect(_trie.wildcard("H*ll.", 2)).toEqual([
            { key : 'Hello', value : 'World' },
            { key : 'Hilly', value : 'World' }
        ]);

        expect(_trie.wildcard("H*ll.", 1)).toEqual([
            { key : 'Hello', value : 'World' }
        ]);

        expect(_trie.wildcard("H*ll.", 0)).toEqual([]);

        expect(_trie.wildcard("Hel", 10)).toEqual([])
    });

    it("should match starts_with", function() {
        expect(_trie.starts_with("xyz", 1)).toEqual([]);

        /* Fetch all */
        expect(_trie.starts_with("H", -1)).toEqual([
            { key : 'Hello', value : 'World' },
            { key : 'Hello, bob', value : 'World' },
            { key : 'Hello, brother', value : 'World' },
            { key : 'Hilly', value : 'World' }
        ]);

        /* Fetch 4 */
        expect(_trie.starts_with("H", 4)).toEqual([
            { key : 'Hello', value : 'World' },
            { key : 'Hello, bob', value : 'World' },
            { key : 'Hello, brother', value : 'World' },
            { key : 'Hilly', value : 'World' }
        ]);

        expect(_trie.starts_with("H", 1)).toEqual([
            { key : 'Hello', value : 'World' }
        ]);

        expect(_trie.starts_with("H", 0)).toEqual([]);

        expect(_trie.starts_with("He", 2)).toEqual([
            { key : 'Hello', value : 'World' },
            { key : 'Hello, bob', value : 'World' }
        ]);

        expect(_trie.starts_with("He", 3)).toEqual([
            { key : 'Hello', value : 'World' },
            { key : 'Hello, bob', value : 'World' },
            { key : 'Hello, brother', value : 'World' }
        ]);

        expect(_trie.starts_with("Hi", 1)).toEqual([
            { key : 'Hilly', value : 'World' }
        ]);

        expect(_trie.starts_with("Hi", 100)).toEqual([
            { key : 'Hilly', value : 'World' }
        ]);
    });

    it("should fetch all values", function () {

        /* Fetch all */
        expect(_trie.all(-1)).toEqual([
            { key : 'Hello', value : 'World' },
            { key : 'Hello, bob', value : 'World' },
            { key : 'Hello, brother', value : 'World' },
            { key : 'Hilly', value : 'World' }
        ]);

        expect(_trie.all(2)).toEqual([
            { key : 'Hello', value : 'World' },
            { key : 'Hello, bob', value : 'World' }
        ]);

        expect(_trie.all(0)).toEqual([]);        
    });
});

