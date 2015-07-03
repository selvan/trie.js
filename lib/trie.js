Trie = function() {
    this.root = null;
};

Trie.Node = function(chr) {
    this.chr = chr;
    this.values = {};
    this.left = this.mid = this.right = null;
    this.end = false
};

Trie.Node.prototype.get_values = function() {
    var result = [];
    for (var id in this.values) {
        result.push(this.values[id]);
    }
    return result;
};

Trie.prototype.push = function(key, value) {
    key = key.toString();
    if (key === null) {
        return null;
    }
    this.root = this.push_recursive(this.root, key, 0, value);
    return value;
};

Trie.prototype.push_recursive = function(node, string, index, value) {
    var chr = string[index];

    if (node === null) {
        node = new Trie.Node(chr)
    }

    if (chr < node.chr) {
        node.left = this.push_recursive(node.left, string, index, value)
    } else if (chr > node.chr) {
        node.right = this.push_recursive(node.right, string, index, value)
    } else if (index < string.length - 1) { /* We're not at the end of the input string; add next chr */
        node.mid = this.push_recursive(node.mid, string, index + 1, value)
    } else {
        node.end = true;
        node.values[value.id] = value;
    }
    return node;
};

Trie.prototype.wildcard = function(string, items_to_fetch) {
    string = string.toString();
    var ary = [];
    this.wildcard_recursive(this.root, string, 0, "", ary, {"items_to_fetch":items_to_fetch, "start_count":0});
    return ary;
};

Trie.prototype.wildcard_recursive = function(node, string, index, prefix, result, config) {
    if (node === null || index == string.length || config.start_count == config.items_to_fetch) {
        return void 0;
    }

    var chr = string[index];

    if (node.end) {
        var matched_key = prefix + node.chr;
        if (matched_key.length >= string.length) {
            result.push({"key":matched_key, "values":node.get_values()});
            config.start_count++;
        }
    }

    if (chr == "*" || chr == "." || chr < node.chr) {
        this.wildcard_recursive(node.left, string, index, prefix, result, config);
    }

    if (chr == "*" || chr == "." || chr == node.chr) {
        this.wildcard_recursive(node.mid, string, index + 1, prefix + node.chr, result, config);
    }

    if (chr == "*" || chr == "." || chr > node.chr) {
        this.wildcard_recursive(node.right, string, index, prefix, result, config);
    }

    return void 0;
};

Trie.prototype.starts_with = function(string, items_to_fetch) {
    string = string.toString();
    var ary = [];
    this.starts_with_recursive(this.root, string, 0, "", ary, {"items_to_fetch":items_to_fetch, "start_count":0});
    return ary;
};

Trie.prototype.starts_with_recursive = function(node, string, index, prefix, result, config) {

    if (node === null || config.start_count == config.items_to_fetch) {
        return void 0;
    }

    var chr = null;

    if (index < string.length) {
        chr = string[index]
    } else {
        chr = "*"
    }

    if (node.end) {
        var matched_key = prefix + node.chr;
        if (matched_key.indexOf(string) == 0 ) {
            result.push({"key":matched_key, "values":node.get_values()});
            config.start_count++;
        }
    }

    if (chr == "*" || chr == "." || chr < node.chr) {
        this.starts_with_recursive(node.left, string, index, prefix, result, config);
    }

    if (chr == "*" || chr == "." || chr == node.chr) {
        this.starts_with_recursive(node.mid, string, index + 1, prefix + node.chr, result, config);
    }

    if (chr == "*" || chr == "." || chr > node.chr) {
        this.starts_with_recursive(node.right, string, index, prefix, result, config);
    }

    return void 0;
};

Trie.prototype.get = function(key) {
    key = key.toString();
    return this.get_recursive(this.root, key, 0)
};

Trie.prototype.get_recursive = function(node, string, index) {
    if (node === null) {
        return null;
    }
    var chr = string[index];
    if (chr < node.chr) {
        return this.get_recursive(node.left, string, index)
    } else if (chr > node.chr) {
        return this.get_recursive(node.right, string, index)
    } else if (index < string.length - 1) {/* We're not at the end of the input string; add next char */
        return this.get_recursive(node.mid, string, index + 1)
    } else {
        return node.end ? node.get_values() : null;
    }
};

Trie.prototype.all = function(items_to_fetch) {
    var result = [];
    this.all_recursive(this.root, "", result, {"items_to_fetch":items_to_fetch, "start_count":0});
    return result;
};

Trie.prototype.all_recursive = function(node, prefix, result, config) {
    if (node === null || config.start_count == config.items_to_fetch) {
        return void 0;
    }

    if (node.end) {
        result.push({"key":prefix + node.chr, "values":node.get_values()});
        config.start_count++;
    }

    if (node.left != null) {
        this.all_recursive(node.left, prefix, result, config)
    }

    if (node.mid != null) {
        this.all_recursive(node.mid, prefix + node.chr, result, config)
    }

    if (node.right != null) {
        this.all_recursive(node.right, prefix, result, config)
    }
    return void 0;
};

Trie.prototype.count = function() {
    var config = {"start_count":0};
    this.count_recursive(this.root, config);
    return config.start_count;
};

Trie.prototype.count_recursive = function(node, config) {
    if (node === null) {
        return void 0;
    }

    if (node.end) {
        config.start_count++;
    }

    if (node.left != null) {
        this.count_recursive(node.left, config)
    }

    if (node.mid != null) {
        this.count_recursive(node.mid, config)
    }

    if (node.right != null) {
        this.count_recursive(node.right, config)
    }
    return void 0;
};

exports.Trie = Trie;
