import ValidatorSelector from "./validator-selector";

export default class Validator {
  #config;

  constructor(config) {
    this.#config = config;
    ValidatorSelector.initialize();
  }

  validate(data) {
    const errors = {};
    const keys = Object.keys(data);

    for (const key of keys) {
      let validatorNamesArr = this.#config[key];
      if (!validatorNamesArr) continue;

      if (typeof validatorNamesArr === "string") {
        validatorNamesArr = [validatorNamesArr];
      }

      for (const validatorName of validatorNamesArr) {
        const validator = ValidatorSelector.select(validatorName);
        const isValid = validator.validate(data[key]);

        if (!isValid) {
          errors[key] = validator.message;   
          break;
        }
      }
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors,
    };
  }
}
