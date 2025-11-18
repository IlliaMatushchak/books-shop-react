import Validator from "./validator/validator";

function validateValue(value, validatorName) {
  let form = { [validatorName]: value };
  let config = { [validatorName]: validatorName };

  const validator = new Validator(config);
  let result = validator.validate(form);

  return result;
}

export function validateAvatar(file) {
  return validateValue(file, "avatar");
}
