// no async
// snd arg, catch will be updated
export default function pseudoPromise(x) {
  return {
    then: fn => pseudoPromise(fn(x))
  };
}
