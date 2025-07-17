// Custom Promise version
class MyPromise {
  constructor(executor) {
    this.state = 'pending'; // fulfilled, rejected, pending
    this.value = undefined;
    this.reason = undefined;
    this.thenCallbacks = [];
    this.catchCallbacks = [];

    // Need to save context inside resolve/reject
    const resolve = (value) => this._resolve(value);
    const reject = (reason) => this._reject(reason);

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  // Possible to call inside or outside of class
  _resolve(value) {
    // pending → fulfilled only once
    // resolve after fulfilled should do nothing
    if (this.state !== 'pending') return;

    this.value = value;
    this.state = 'fulfilled';

    if (this.thenCallbacks.length) {
      this.thenCallbacks.forEach((cb) => cb(value));
    }
  }

  // Possible to call inside or outside of class
  _reject(reason) {
    this.reason = reason;
    this.state = 'rejected';

    if (this.catchCallbacks.length) {
      this.catchCallbacks.forEach((cb) => cb(reason));
    }
  }

  static resolve(value) {
    if (value instanceof MyPromise) return value;
    return new MyPromise(resolve => resolve(value));
  }

  then(onFulfilled) {
    return new MyPromise((resolve, reject) => {

      // Wrapper to handle errors and pass result to next .then()
      const cbWrapper = (value) => {
        try {
          const thenResult = onFulfilled ? onFulfilled(value) : value;
          resolve(thenResult);
        } catch (err) {
          reject(err);
        }
      }

      if (this.state === 'fulfilled') {
        queueMicrotask(() => cbWrapper(this.value));
      } else if (this.state === 'pending') {
        this.thenCallbacks.push(onFulfilled);
      }
    })
  }

  catch(onRejected) {
    return new MyPromise((resolve, reject) => {
      const cbWrapper = (reason) => {
        try {
          const result = onRejected ? onRejected(reason) : reason;
          resolve(result);
        } catch (err) {
          reject(err);
        }
      };

      if (this.state === 'rejected') {
        queueMicrotask(() => cbWrapper(this.reason));
      } else if (this.state === 'pending') {
        this.catchCallbacks.push(cbWrapper);
      }
    });
  }

  static all(promisesArray) {
    if (promisesArray && promisesArray.length) {

      return new MyPromise((resolve, reject) => {

        // Promises execution results
        const results = [];
        // We need to count if all promises resolved
        let completed = 0;

        promisesArray.forEach((promise, index) => {
          // Wrap non-promises data in MyPromise
          MyPromise.resolve(promise)
            .then(value => {
              // Save by index
              results[index] = value;
              completed++;

              // Check if all promises from initial array completed
              if (completed === promisesArray.length) {
                resolve(results);
              }
            })
            .catch(reject); // First which fail call reject
        });

        // Empty array check
        if (promisesArray.length === 0) {
          resolve([]);
        }
      })
    }
  }

  finally(callback) {
    return new MyPromise((resolve, reject) => {
      const handler = () => {
        try {
          // If callback resolves successfully then send initial result
          const result = callback();
          if (result instanceof MyPromise) {
            result.then(() => {
              this.state === 'fulfilled' ? resolve(this.value) : reject(this.reason);
            }).catch(reject);
          } else {
            this.state === 'fulfilled' ? resolve(this.value) : reject(this.reason);
          }
        } catch (err) {
          reject(err);
        }
      };

      if (this.state === 'fulfilled' || this.state === 'rejected') {
        queueMicrotask(handler);
      } else {
        this.thenCallbacks.push(() => {
          handler();
        });
        this.catchCallbacks.push(() => {
          handler();
        });
      }
    });
  }
}

// Launch tests for this?
new MyPromise((res) => res(42)).then(v => console.log(v)) // 42
new MyPromise((_, rej) => rej('fail')).catch(e => console.log(e)) // "fail"
new MyPromise((res) => setTimeout(() => res('later'), 100)).then(console.log) // later
new MyPromise(res => res(2))
  .then(x => x + 2)
  .then(x => console.log(x)) // 4
MyPromise.all([
  MyPromise.resolve(1),
  2,
  new MyPromise(res => setTimeout(() => res(3), 100))
]).then(values => {
  console.log('all promises resolved', values); // [1, 2, 3]
});
new MyPromise(res => res(1))
  .finally(() => console.log('Done!'))
  .then(val => console.log(val)); // Done! 1
