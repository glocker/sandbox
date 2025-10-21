// Given a list of strings, implement a function listFormat that returns the items concatenated into a single string. A common use case would be in summarizing the reactions for social media posts.
//
//   The function should support a few options as the second parameter:
//
//   sorted: Sorts the items by alphabetical order.
//   length: Show only the first length items, using "and X other(s)" for the remaining. Ignore invalid values (negative, 0, etc).
//   unique: Remove duplicate items.

/**
 * @param {Array<string>} items
 * @param {{sorted?: boolean, length?: number, unique?: boolean}} [options]
 * @return {string}
 */
export default function listFormat(items, options) {

  let initialArray = items;
  let othersCount = 0;

  initialArray = initialArray.filter(item => item && item.trim() !== '');

  if (options?.sorted) {
    initialArray = initialArray.sort((a, b) => a.localeCompare(b));
  }

  if (options?.unique) {
    initialArray = initialArray.filter((item, index) => {
      return initialArray.indexOf(item) === index;
    })
  }

  if (options?.length && options.length > 0) {
    othersCount = Math.max(0, initialArray.length - options.length);
    initialArray = initialArray.slice(0, options.length);
  }

  if (initialArray.length === 0) {
    return '';
  }

  if (initialArray.length === 1) {
    return initialArray[0];
  }

  if (initialArray.length > 1) {


  if (othersCount > 0) {
    return initialArray.join(', ') + ' and ' + othersCount + (othersCount === 1 ? ' other' : ' others');
  }

    const tail = initialArray[initialArray.length - 1];
    const head = initialArray.slice(0, -1);

    return head.join(', ') + ' and ' + tail;
  }

}

// Examples
// listFormat([]); // ''
//
// listFormat(['Bob']); // 'Bob'
// listFormat(['Bob', 'Alice']); // 'Bob and Alice'
//
// listFormat(['Bob', 'Ben', 'Tim', 'Jane', 'John']);
// // 'Bob, Ben, Tim, Jane and John'
//
// listFormat(['Bob', 'Ben', 'Tim', 'Jane', 'John'], {
//   length: 3,
// }); // 'Bob, Ben, Tim and 2 others'
//
// listFormat(['Bob', 'Ben', 'Tim', 'Jane', 'John'], {
//   length: 4,
// }); // 'Bob, Ben, Tim, Jane and 1 other'
//
// listFormat(['Bob', 'Ben', 'Tim', 'Jane', 'John'], {
//   length: 3,
//   sorted: true,
// }); // 'Ben, Bob, Jane and 2 others'
//
// listFormat(['Bob', 'Ben', 'Tim', 'Jane', 'John', 'Bob'], {
//   length: 3,
//   unique: true,
// }); // 'Bob, Ben, Tim and 2 others'
//
// listFormat(['Bob', 'Ben', 'Tim', 'Jane', 'John'], {
//   length: 3,
//   unique: true,
// }); // 'Bob, Ben, Tim and 2 others'
//
// listFormat(['Bob', 'Ben', '', '', 'John']); // 'Bob, Ben and John'