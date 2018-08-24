export default function isFromNative(obj) {
  return obj instanceof RegExp || obj instanceof Promise || obj instanceof Date;
}
