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
    var sample_value = {"id":1, "txt":"World"};
    beforeEach(function() {
        _trie = new trie.Trie();
        _trie.push("Hello", sample_value);
        _trie.push("Hilly", sample_value);
        _trie.push("Hello, brother", sample_value);
        _trie.push("Hello, bob", sample_value);
    });

    it("should get valid values", function() {
        expect(_trie.get("Hello")).toEqual([sample_value]);
        expect(_trie.get("Hello, brother")).toEqual([sample_value]);
    });

    it("should not overwrite values", function() {
        var value_2 = {"id":2, "txt":"John"};
        _trie.push("Hello", value_2);
        expect(_trie.get("Hello")).toEqual([sample_value, value_2]);
    });

    it("should overwrite values", function() {
        var value_2 = {"id":1, "txt":"John"};
        _trie.push("Hello", value_2);
        expect(_trie.get("Hello")).toEqual([value_2]);
    });    

    it("should match wildcards", function () {

        /* Fetch all */
        expect(_trie.wildcard("H*ll.", -1)).toEqual([
            { key : 'Hello', values : [sample_value] },
            { key : 'Hilly', values : [sample_value] }
        ]);

        /* Fetch 2 */
        expect(_trie.wildcard("H*ll.", 2)).toEqual([
            { key : 'Hello', values : [sample_value] },
            { key : 'Hilly', values : [sample_value] }
        ]);

        expect(_trie.wildcard("H*ll.", 1)).toEqual([
            { key : 'Hello', values : [sample_value] }
        ]);

        expect(_trie.wildcard("H*ll.", 0)).toEqual([]);

        expect(_trie.wildcard("Hel", 10)).toEqual([])
    });

    it("should match starts_with", function() {
        expect(_trie.starts_with("xyz", 1)).toEqual([]);

        /* Fetch all */
        expect(_trie.starts_with("H", -1)).toEqual([
            { key : 'Hello', values : [sample_value] },
            { key : 'Hello, bob', values : [sample_value] },
            { key : 'Hello, brother', values : [sample_value] },
            { key : 'Hilly', values : [sample_value] }
        ]);

        /* Fetch 4 */
        expect(_trie.starts_with("H", 4)).toEqual([
            { key : 'Hello', values : [sample_value] },
            { key : 'Hello, bob', values : [sample_value] },
            { key : 'Hello, brother', values : [sample_value] },
            { key : 'Hilly', values : [sample_value] }
        ]);

        expect(_trie.starts_with("H", 1)).toEqual([
            { key : 'Hello', values : [sample_value] }
        ]);

        expect(_trie.starts_with("H", 0)).toEqual([]);

        expect(_trie.starts_with("He", 2)).toEqual([
            { key : 'Hello', values : [sample_value] },
            { key : 'Hello, bob', values : [sample_value] }
        ]);

        expect(_trie.starts_with("He", 3)).toEqual([
            { key : 'Hello', values : [sample_value] },
            { key : 'Hello, bob', values : [sample_value] },
            { key : 'Hello, brother', values : [sample_value] }
        ]);

        expect(_trie.starts_with("Hi", 1)).toEqual([
            { key : 'Hilly', values : [sample_value] }
        ]);

        expect(_trie.starts_with("Hi", 100)).toEqual([
            { key : 'Hilly', values : [sample_value] }
        ]);
    });

    it("should fetch all values", function () {

        /* Fetch all */
        expect(_trie.all(-1)).toEqual([
            { key : 'Hello', values : [sample_value] },
            { key : 'Hello, bob', values : [sample_value] },
            { key : 'Hello, brother', values : [sample_value] },
            { key : 'Hilly', values : [sample_value] }
        ]);

        expect(_trie.all(2)).toEqual([
            { key : 'Hello', values : [sample_value] },
            { key : 'Hello, bob', values : [sample_value] }
        ]);

        expect(_trie.all(0)).toEqual([]);
    });
});

