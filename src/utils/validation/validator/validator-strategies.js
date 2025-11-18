export class NameValidator {
  message;

  validate(value) {
    this.message = "";
    if (!value.trim()) {
      this.message = "Enter your name!";
    } else if (value.length < 2) {
      this.message = "The name is too short!";
    } else if (value.length > 10) {
      this.message = "The name is too long!";
    }
    return !this.message.length;
  }
}