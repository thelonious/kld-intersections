// TODO: Consider switching these functions over to using iteration and then
//  turning into its own module

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
    constructor(...items) {
        const itemsLength = items.length;

        if (itemsLength > 0) {
            if (typeof items[itemsLength - 1] === "number" ) {
                this.repeating = items.pop();
            }
            else {
                this.repeating = 1;
            }

            this.items = items;
        }
        else {
            this.items = [];
            this.repeating = 1;
        }
    }

    [Symbol.iterator]() {
        return {
            indexes: Array(this.items.length * this.repeating).fill(0),
            lists: Array(this.repeating).fill(this.items).reduce((acc, val) => acc.concat(val), []),
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
