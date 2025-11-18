import ValidatorSelector from "./validator-selector";

export default class Validator {
  #config;

  constructor(config) {
    this.#config = config;
    ValidatorSelector.initialize();
  }

  validate(data) {
    const messages = {};

    const keys = Object.keys(data);
    keys.forEach((key) => {
      const validatorName = this.#config[key];

      if (!validatorName) {
        return;
      }

      const validator = ValidatorSelector.select(validatorName);
      const validatorValue = data[key];
      const isValid = validator.validate(validatorValue);

      if (!isValid) {
        messages[key] = validator.message;
      }
    });

    return {
      valid: Object.keys(messages).length === 0,
      errors: messages,
    };
  }
}
