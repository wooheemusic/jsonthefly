/**
 * This generates an array with length, callback and args.
 */
export default function iterate(length, callback, ...args) {
  const arr = [];
  for (let i = 0; i < length; i++) {
    const element = callback(i, ...args);
    if (element) {
      arr.push(element);
    }
  }
  return arr;
}
