import Validator from "./validator/validator";

function validateForm(form, config) {
  const validator = new Validator(config);
  return validator.validate(form);
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
