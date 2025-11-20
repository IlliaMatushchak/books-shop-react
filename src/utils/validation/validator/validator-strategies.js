import { BaseValidator } from "./base-validator";

export class NameValidator extends BaseValidator {
  validate(value) {
    this.reset();
    if (!value.trim()) {
      this.setError("Enter your name!");
      return false;
    } else if (value.length < 2) {
      this.setError("The name is too short!");
      return false;
    } else if (value.length > 10) {
      this.setError("The name is too long!");
      return false;
    }
    return true;
  }
}

export class PasswordValidator extends BaseValidator {
  validate(value) {
    this.reset();
    if (!value) {
      this.setError("Password is required!");
      return false;
    } else if (value.length < 6) {
      this.setError("Password must be at least 6 characters long!");
      return false;
    } else if (!/[A-Z]/.test(value)) {
      this.setError("Password must contain at least one uppercase letter!");
      return false;
    } else if (!/[0-9]/.test(value)) {
      this.setError("Password must contain at least one number!");
      return false;
    }
    return true;
  }
}

export class EmailValidator extends BaseValidator {
  validate(value) {
    this.reset();
    if (!value.trim()) {
      this.setError("Email is required!");
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(value)) {
      this.setError("Incorrect email!");
      return false;
    }
    return true;
  }
  // /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/i
  //  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
}

export class PhoneNumberValidator extends BaseValidator {
  validate(value) {
    this.reset();
    if (!value.trim()) {
      this.setError("Phone number is required!");
      return false;
    } else if (!/^\+?\d{10,15}$/.test(value)) {
      this.setError("Incorrect phone number!");
      return false;
    }
    return true;
  }
  // ^\+380\d{9}$
}

export class AvatarValidator extends BaseValidator {
  MAX_SIZE = 1 * 1024 * 1024; // max file size = 1MB
  ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

  validate(file) {
    this.reset();
    if (!file) {
      this.setError("File is required.");
      return false;
    } else if (!this.ALLOWED_TYPES.includes(file.type)) {
      this.setError("Allowed formats: JPG, PNG, WEBP.");
      return false;
    } else if (file.size > this.MAX_SIZE) {
      this.setError("The file cannot be larger than 1MB.");
      return false;
    }
    return true;
  }
}

export class PasswordEqualityValidator extends BaseValidator {
  validate({ newPassword, confirm }) {
    this.reset();
    if (newPassword !== confirm) {
      this.setError("New passwords do not match!");
      return false;
    }
    return true;
  }
}
