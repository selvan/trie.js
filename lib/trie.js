Trie = function() {
    this.root = null;
};

exports.Trie = Trie;

Trie.Node = function(chr, value) {
    this.chr = chr;
    this.value = value;
    this.left = this.mid = this.right = null;
    this.end = false
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
        node = new Trie.Node(chr, value)
    }

    if (chr < node.chr) {
        node.left = this.push_recursive(node.left, string, index, value)
    } else if (chr > node.chr) {
        node.right = this.push_recursive(node.right, string, index, value)
    } else if (index < string.length - 1) { /* We're not at the end of the input string; add next chr */
        node.mid = this.push_recursive(node.mid, string, index + 1, value)
    } else {
        node.end = true;
        node.value = value;
    }
    return node;
};

Trie.prototype.wildcard = function(string) {
    string = string.toString();
    var ary = [];
    this.wildcard_recursive(this.root, string, 0, "", ary);
    return ary;
};

Trie.prototype.wildcard_recursive = function(node, string, index, prefix, result) {
    if (node === null || index == string.length) {
        return void 0;
    }

    var chr = string[index];

    if (chr == "*" || chr == "." || chr < node.chr) {
        this.wildcard_recursive(node.left, string, index, prefix, result);
    }

    if (chr == "*" || chr == "." || chr > node.chr) {
        this.wildcard_recursive(node.right, string, index, prefix, result);
    }

    if (chr == "*" || chr == "." || chr == node.chr) {
        if (node.end) {
            result.push({"key":prefix + node.chr, "value":node.value});
        }
        this.wildcard_recursive(node.mid, string, index + 1, prefix + node.chr, result);
    }
    return void 0;
};

Trie.prototype.starts_with = function(string) {
    string = string.toString();
    var ary = [];
    this.starts_with_recursive(this.root, string, 0, "", ary);
    return ary;
};

Trie.prototype.starts_with_recursive = function(node, string, index, prefix, result) {
    if (node === null) {
        return void 0;
    }

    var chr = null;

    if (index < string.length) {
        chr = string[index]
    } else {
        chr = "*"
    }

    if (chr == "*" || chr == "." || chr < node.chr) {
        this.starts_with_recursive(node.left, string, index, prefix, result);
    }

    if (chr == "*" || chr == "." || chr > node.chr) {
        this.starts_with_recursive(node.right, string, index, prefix, result);
    }

    if (chr == "*" || chr == "." || chr == node.chr) {
        if (node.end) {
            result.push({"key":prefix + node.chr, "value":node.value});
        }
        this.starts_with_recursive(node.mid, string, index + 1, prefix + node.chr, result);
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
        return node.end ? node.value : null;
    }
};