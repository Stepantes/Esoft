//Circular object sample
const object = {
    one: "two"
}
//Creating a circular object
object.three = object;

function deepClone(object, hash = new WeakMap()) {
    if (object === null || typeof object !== 'object') {
        return object;
    }

    if (hash.has(object)) {
        return hash.get(object);
    }

    if (object instanceof Date) {
        const copy = new Date(object);
        hash.set(object, copy);
        return copy;
    }

    if (object instanceof Map) {
        const copy = new Map();
        hash.set(object, copy);
        object.forEach((value, key) => {
            copy.set(deepClone(key, hash), deepClone(value, hash));
        });
        return copy;
    }

    if (object instanceof Set) {
        const copy = new Set();
        hash.set(object, copy);
        object.forEach(value => {
            copy.add(deepClone(value, hash));
        });
        return copy;
    }

    if (object instanceof RegExp) {
        const copy = new RegExp(object.object, object.flags);
        hash.set(object, copy);
        return copy;
    }

    if (Array.isArray(object)) {
        const copy = [];
        hash.set(object, copy);
        for (let i = 0; i < object.length; i++) {
            copy[i] = deepClone(object[i], hash);
        }
        return copy;
    }

    const copy = Object.create(Object.getPrototypeOf(object));
    hash.set(object, copy);

    const symbolKeys = Object.getOwnPropertySymbols(object);
    for (const sym of symbolKeys) {
        copy[sym] = deepClone(object[sym], hash);
    }

    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            copy[key] = deepClone(object[key], hash);
        }
    }

    return copy;
}

//TEST
let copy = deepClone(object);
console.log(copy);
console.log(object);
object.four = "Kitty"
console.log(copy);
console.log(object);
