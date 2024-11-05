
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

    // Custom Array.prototype.map
    Array.prototype.myForEach = function(callback) {

        const newArray = [];

        for (let i = 0; i < this.length; i++) {
            newArray.push(callback(this[i]));
        }

        return newArray;
    }

    const resultMap = arrOfNums.myMap(item => item + 1);
    const resultForEach = arrOfNums.myForEach(item => item * 3);

    return (
        <>
            <h3>Array.prototype.map</h3>
            <div>{resultMap}</div>
            <h3>Array.prototype.forEach</h3>
            <div>{resultForEach}</div>
        </>
    )
}