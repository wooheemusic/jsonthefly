import parameterize from "./parameterize";
import _subtract from "../array/subtract";

export default function subtract(a, b) {
  return parameterize(_subtract(a, b));
}
