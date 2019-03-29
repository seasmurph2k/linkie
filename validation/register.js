const Validator = require("validator");

module.exports = data => {
  const { username, email, password, confirmPassword } = data;
  let errors = {};
  if (Validator.isEmpty(username)) {
    errors.username = "Username required";
  }
  if (Validator.isEmpty(email)) {
    errors.email = "Email required";
  }
  if (Validator.isEmpty(password)) {
    errors.password = "Password required";
  }
  if (Validator.isEmpty(confirmPassword)) {
    errors.password2 = "Confirmation password required";
  }
  if (!Validator.isEmail(email)) {
    errors.email = "Must be a valid email";
  }
  if (!Validator.isLength(username, { min: 3 })) {
    errors.username = "Username must be atleast 3 characters";
  }
  if (!Validator.isLength(password, { min: 8 })) {
    errors.password = "Password must be at least 8 characters";
  }
  if (!Validator.equals(password, confirmPassword)) {
    errors.password2 = "Passwords don't match";
  }
  let isValid;
  Object.keys(errors).length > 0 ? (isValid = false) : (isValid = true);
  return {
    isValid,
    errors
  };
};
