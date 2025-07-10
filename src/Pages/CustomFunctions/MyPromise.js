// Custom Promise version
class MyPromise {
    constructor(executor) {
        this.state = 'pending'; // fulfilled, rejected, pending
        this.value= undefined;
        this.reason = undefined;
        this.thenCallbacks = [];
        this.catchCallbacks = [];

        // Need to save context inside this.resolve
        executor(this.resolve.bind(this), this.reject.bind(this));
    }

    resolve(value) {

        // pending → fulfilled only once
        // resolve after fulfilled should do nothing
        if (this.state !== 'pending') return;

        this.value = value;
        this.state = 'fulfilled';

        if (this.thenCallbacks.length) {
            this.thenCallbacks.forEach(callback => callback(value));
        }
    }

    reject(value) {

        this.value = value;
        this.state = 'rejected';

        if (this.catchCallbacks.length) {
            this.catchCallbacks.forEach(callback => callback(value));
        }
    }

    then(onFulfilled) {
        if (this.state === 'fulfilled') {
            onFulfilled(this.value);
        } else if (this.state === 'pending') {
            this.thenCallbacks.push(onFulfilled);
        }

        // future then chaining
        return this;
    }
}

// Launch tests for this?
const promise1 = new MyPromise((resolve) => {
    resolve("Resolve. pending → fulfilled");
});

promise1.then(value => {
    console.log("Got value in then:", value);
});