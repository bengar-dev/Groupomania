export function removeItemAtIndex(arr, index) { // function remove sur un state
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
  }