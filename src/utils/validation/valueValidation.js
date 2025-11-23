import Validator from "./validator/validator";

function validateValue(value, ...validatorNames) {
  const validatorNamesArr = Array.isArray(validatorNames[0])
    ? validatorNames[0]
    : validatorNames;

  const validator = new Validator(validatorNamesArr);
  return validator.validate(value);
}

export function validateAvatar(file) {
  return validateValue(file, "required", "avatar");
}

export function validateOrderQuantity(totalCount, maxTotalCount) {
  return validateValue({ totalCount, maxTotalCount }, "orderQuantity");
}
