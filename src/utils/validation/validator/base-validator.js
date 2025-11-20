export class BaseValidator {
  message = "";

  setError(msg) {
    this.message = msg;
  }

  reset() {
    this.message = "";
  }

  validate(value) {
    throw new Error("validate() must be implemented in subclass");
  }
}
