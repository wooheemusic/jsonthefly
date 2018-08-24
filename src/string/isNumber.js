import is from "../object/is";

export default function isNumber(value) {
  return (
    typeof value === "string" &&
    value !== "" &&
    (!value.startsWith("0") || value === "0") &&
    !is(Number(value), NaN)
  );
}
