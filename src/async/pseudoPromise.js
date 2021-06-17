export default function pseudoPromise() {
  return {
      then: pseudoPromise,
      catch: pseudoPromise,
      finally: pseudoPromise,
  };
}
