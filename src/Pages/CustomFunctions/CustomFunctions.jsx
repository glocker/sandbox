
export default function CustomFunction() {

    const arrOfNums = [1, 2, 3];

    // Custom Array.prototype.map
    Array.prototype.myMap = function(callback, args) {

        const newArray = [];

        for (let i = 0; i < this.length; i++) {
            newArray.push(callback(this[i], i, args));
        }

        return newArray;
    }

    const res = arrOfNums.myMap(item => item + 1);

    return (res)
}