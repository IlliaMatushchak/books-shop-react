import Validator from "./validator/validator";

export function validateLoginForm(form) {
  const config = {
    username: "name",
    password: "password",
  };
  if (!form) throw new Error("No data found for validation " + form);
  const validator = new Validator(config);
  let result = validator.validate(form);
  return result;
}
