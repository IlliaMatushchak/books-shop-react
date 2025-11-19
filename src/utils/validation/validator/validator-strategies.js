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

export class EmailValidator {
  message;

  validate(value) {
    this.message = "";
    if (!value.trim()) {
      this.message = "Email is required!";
    } else if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(value)) {
      this.message = "Incorrect email!";
    }
    return !this.message.length;
  }
  // /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/i
  //  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
}

export class PhoneNumberValidator {
  message;

  validate(value) {
    this.message = "";
    if (!value.trim()) {
      this.message = "Phone number is required!";
    } else if (!/^\+?\d{10,15}$/.test(value)) {
      this.message = "Incorrect phone number!";
    }
    return !this.message.length;
  }
  // ^\+380\d{9}$
}

export class AvatarValidator {
  MAX_SIZE = 1 * 1024 * 1024; // max file size = 1MB
  ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
  message;

  validate(file) {
    this.message = "";
    if (!file) {
      this.message = "File is required.";
    } else if (!this.ALLOWED_TYPES.includes(file.type)) {
      this.message = "Allowed formats: JPG, PNG, WEBP.";
    } else if (file.size > this.MAX_SIZE) {
      this.message = "The file cannot be larger than 1MB.";
    }

    return !this.message.length;
  }
}

export class PasswordEqualityValidator {
  message;

  validate({ newPassword, confirm }) {
    this.message = "";
    if (newPassword !== confirm) {
      this.message = "New passwords do not match!";
    }

    return !this.message.length;
  }
}