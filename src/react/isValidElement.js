/**
 * This is from react 16.3.2. It can be changed someday so I have to specify the version in the peer dependencies.
 */

const REACT_ELEMENT_TYPE =
  typeof Symbol === "function" && Symbol.for
    ? Symbol.for("react.element")
    : 0xeac7;

export default function isValidElement(object) {
  return (
    typeof object === "object" &&
    object !== null &&
    object.$$typeof === REACT_ELEMENT_TYPE
  );
}
