import {
  NameValidator,
  PasswordValidator,
  EmailValidator,
  PhoneNumberValidator,
} from "./validator-strategies";

export default class ValidatorSelector {
  static #validators = {};

  static initialize() {
    ValidatorSelector.#validators["name"] = new NameValidator();
    ValidatorSelector.#validators["password"] = new PasswordValidator();
    ValidatorSelector.#validators["email"] = new EmailValidator();
    ValidatorSelector.#validators["phoneNumber"] = new PhoneNumberValidator();

    ValidatorSelector.initialize = () => {}; // для уникнення повторної ініціалізації
  }

  static select(name) {
    const validator = ValidatorSelector.#validators[name];
    if (validator) {
      return validator;
    } else {
      throw new Error("No validator found " + name);
    }
  }
}
