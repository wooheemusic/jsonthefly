export default function normalize(obj) {
  const keys = Object.keys(obj);
  const l = keys.length;
  for (let i = 0; i < l; i++) {
    const key = keys[i];
    const value = obj[key];
    if (value === null || value === undefined) {
      delete obj[key];
    }
  }
  return obj;
}
