import Validator from "./validator/validator";

function validateForm(form, config) {
  if (!form) throw new Error("No data found for validation " + form);
  const validator = new Validator(config);
  let result = validator.validate(form);
  return result;
}

export function validateLoginForm(form) {
  const config = {
    username: "name",
    password: "password",
  };
  return validateForm(form, config);
}

export function validateRegistrationForm(form) {
  const config = {
    username: "name",
    password: "password",
    email: "email",
    phoneNumber: "phoneNumber",
  };
  return validateForm(form, config);
}

export function validateUserInfoForm(form) {
  const config = {
    email: "email",
    phoneNumber: "phoneNumber",
  };
  return validateForm(form, config);
}

export function validatePasswordForm(form) {
  if (!form) throw new Error("No data found for validation " + form);

  const config = {
    newPassword: "password",
  };

  if (form.newPassword !== form.confirm) {
    return {
      valid: false,
      errors: { confirm: "New passwords do not match!" },
    };
  }

  return validateForm(form, config);
}
