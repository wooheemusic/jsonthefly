import parameterize from "./parameterize";
import _merge from "../array/merge";

export default function merge(a, b) {
  return parameterize(_merge(a, b));
}
