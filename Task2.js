const object1= {name: "BOB", address: {city: "Washington", state: "None"}, languages: ["Нем","Англ","Рус"]};
function deepCopy(object) {
    const copy = [];
    if(Array.isArray(object)) {
        object.forEach((item) => {
            copy.push(deepCopy(item));
        });
        return copy;
    }
    else if(object !== null && typeof object === "object") {
        let copy = {};
        if (typeof object !== "object" || object === null) {
            return object;
        }
        for (let key in object) {
            copy[key] = deepCopy(object[key]);
        }
        return copy;
    }
    else {
        return object;
    }
}
const deepCopied = (deepCopy(object1))

//Вывод объектов
console.log(deepCopied);
console.log(object1);

