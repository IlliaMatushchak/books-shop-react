import {
  NameValidator,
} from "./validator-strategies";

export default class ValidatorSelector {
  static #validators = {};

  static initialize() {
    ValidatorSelector.#validators["name"] = new NameValidator();

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
