// Implement a useArray hook that manages an array of items with additional utility methods.
// It is more convenient to use useArray over plain useState because in the latter case, you would always have to create a new array, mutate it, then set state to use the new array, which can be quite cumbersome.
// The hook should work generically with arrays of any types.

import { useState } from 'react';

/**
 *
 * useArray hook implementation
 * @param defaultValue
 * @returns {Object}
 */

function useArray(defaultValue) {
  const [array, setArray] = useState(defaultValue);

  return {
    array,
  }
}

export default function UseArray(defaultValue) {
  const { array } = useArray([123]);
  console.log('array from hook:', array);
  return <div>{array.join(', ')}</div>;
}
