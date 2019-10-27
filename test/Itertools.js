function zip(...arrays) {
    const lengths = arrays.map(a => a.length);
    const minLength = Math.min(...lengths);
    const result = [];

    for (let i = 0; i < minLength; i++) {
        let element = arrays.map(a => a[i]);

        result.push(element);
    }

    return result;
}

class Product {
    constructor(items, repeating = 1) {
        this.items = items;
        this.repeating = repeating;
    }

    [Symbol.iterator]() {
        return {
            indexes: Array(this.repeating === 0 ? this.items.length : this.repeating).fill(0),
            lists: this.repeating === 0 ? this.items : Array(this.repeating).fill(this.items),
            complete: this.items.count === 0,

            next() {
                if (this.complete === true) {
                    return {done: true}
                }

                let result = [];

                for (let [list, index] of zip(this.lists, this.indexes)) {
                    result.push(list[index]);
                }

                this.complete = true;

                for (let i = this.indexes.length - 1; i >= 0; i--) {
                    const list = this.lists[i];
                    let index = this.indexes[i];

                    index += 1;

                    if (index >= list.length) {
                        this.indexes[i] = 0;
                    }
                    else {
                        this.indexes[i] = index;
                        this.complete = false;
                        break;
                    }
                }

                return {value: result, done: false};
            }
        }
    }
}

module.exports = {
    zip,
    Product,
    // Permutation
};
