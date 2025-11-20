import {
  NameValidator,
  PasswordValidator,
  EmailValidator,
  PhoneNumberValidator,
  AvatarValidator,
  PasswordEqualityValidator,
} from "./validator-strategies";

export default class ValidatorSelector {
  static #validators = {};

  static initialize() {
    ValidatorSelector.#validators = {
      name: new NameValidator(),
      password: new PasswordValidator(),
      email: new EmailValidator(),
      phoneNumber: new PhoneNumberValidator(),
      avatar: new AvatarValidator(),
      passwordEquality: new PasswordEqualityValidator(),
    };

    ValidatorSelector.initialize = () => {}; // для уникнення повторної ініціалізації
  }

  static select(name) {
    const validator = ValidatorSelector.#validators[name];
    if (!validator) throw new Error("No validator found: " + name);
    return validator;
  }
}
