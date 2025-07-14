// Custom Promise version
class MyPromise {
  constructor(executor) {
    this.state = 'pending'; // fulfilled, rejected, pending
    this.value = undefined;
    this.reason = undefined;
    this.thenCallbacks = [];
    this.catchCallbacks = [];

    // Need to save context inside this.resolve and this.reject
    executor(this.resolve.bind(this), this.reject.bind(this));
  }

  resolve(value) {
    // pending → fulfilled only once
    // resolve after fulfilled should do nothing
    if (this.state !== 'pending') return;

    this.value = value;
    this.state = 'fulfilled';

    if (this.thenCallbacks.length) {
      this.thenCallbacks.forEach((cb) => cb(value));
    }
  }

  reject(reason) {
    this.reason = reason;
    this.state = 'rejected';

    if (this.catchCallbacks.length) {
      this.catchCallbacks.forEach((cb) => cb(reason));
    }
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
}

// Launch tests for this?
new MyPromise((res) => res(42)).then(v => console.log(v)) // 42
new MyPromise((_, rej) => rej('fail')).catch(e => console.log(e)) // "fail"
new MyPromise((res) => setTimeout(() => res('later'), 100)).then(console.log) // later
new MyPromise(res => res(2))
  .then(x => x + 2)
  .then(x => console.log(x)) // 4
