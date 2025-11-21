import Validator from "./validator/validator";

function validateValue(value, ...validatorNames) {
  let validatorNamesArr = [];
  if (Array.isArray(validatorNames[0])) {
    validatorNamesArr = validatorNames[0];
  } else {
    validatorNamesArr = validatorNames;
  }

  const validator = new Validator(validatorNamesArr);
  let result = validator.validate(value);

  return result;
}

export function validateAvatar(file) {
  return validateValue(file, "required", "avatar");
}

export function validateOrderQuantity(totalCount, maxTotalCount) {
  return validateValue({ totalCount, maxTotalCount }, "orderQuantity");
}

