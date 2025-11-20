import Validator from "./validator/validator";

function validateForm(form, config) {
  if (!form) throw new Error("No data found for validation " + form);
  const validator = new Validator(config);
  let result = validator.validate(form);
  return result;
}

export function validateLoginForm(form) {
  const config = {
    username: ["required", "name"],
    password: ["required", "password"],
  };
  return validateForm(form, config);
}

export function validateRegistrationForm(form) {
  const config = {
    username: ["required", "name"],
    password: ["required", "password"],
    email: ["required", "email"],
    phoneNumber: ["required", "phoneNumber"],
  };
  return validateForm(form, config);
}

export function validateUserInfoForm(form) {
  const config = {
    email: ["required", "email"],
    phoneNumber: ["required", "phoneNumber"],
  };
  return validateForm(form, config);
}

export function validatePasswordForm({ newPassword, confirm }) {
  const newForm = {
    newPassword: newPassword,
    confirm: { newPassword, confirm },
  };

  const config = {
    newPassword: ["required", "password"],
    confirm: "passwordEquality",
  };

  return validateForm(newForm, config);
}
