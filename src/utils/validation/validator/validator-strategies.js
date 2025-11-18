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

export class PasswordValidator {
  message;

  validate(value) {
    this.message = "";
    if (!value) {
      this.message = "Password is required!";
    } else if (value.length < 6) {
      this.message = "Password must be at least 6 characters long!";
    } else if (!/[A-Z]/.test(value)) {
      this.message = "Password must contain at least one uppercase letter!";
    } else if (!/[0-9]/.test(value)) {
      this.message = "Password must contain at least one number!";
    }
    return !this.message.length;
  }
}