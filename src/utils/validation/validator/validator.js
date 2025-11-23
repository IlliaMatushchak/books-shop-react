import ValidatorSelector from "./validator-selector";

export default class Validator {
  #config;
  validate;

  constructor(config) {
    const isValidConfigType =
      typeof config === "string" ||
      Array.isArray(config) ||
      typeof config === "object";

    if (!config) throw new Error("No validation config provided!");
    if (!isValidConfigType) {
      throw new Error("Config must be string, array, or object!");
    }

    this.#config = config;

    if (typeof config === "string" || Array.isArray(config)) {
      this.validate = this.#validateValue;
    } else {
      this.validate = this.#validateObj;
    }

    ValidatorSelector.initialize();
  }

  #validateObj(data) {
    if (!data || typeof data !== "object")
      throw new Error("Validation failed: data is missing or invalid.");

    const errors = {};
    const keys = Object.keys(this.#config);

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

  #validateValue(value) {
    let error = "";
    let valid = true;
    let validatorNamesArr = this.#config;

    if (typeof validatorNamesArr === "string") {
      validatorNamesArr = [validatorNamesArr];
    }

    for (const validatorName of validatorNamesArr) {
      const validator = ValidatorSelector.select(validatorName);
      const isValid = validator.validate(value);

      if (!isValid) {
        error = validator.message;
        valid = isValid;
        break;
      }
    }

    return { valid, error };
  }
}
