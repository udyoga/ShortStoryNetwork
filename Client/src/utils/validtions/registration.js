export const validateRegistration = (data) => {
    let errors = {};
    if (data) {
      const emailError = validateEmail(data.emailAddress);

      if (emailError) {
        errors.emailAddress = emailError;
      }
      if (data.passwordHash?.length == 0) {
        errors.passwordHash = "Password should not be empty";
      }
      if (data.firstName?.length == 0) {
        errors.firstName = "First Name should not be empty";
      }
      if (data.userRole?.length==0 ){
        errors.userRole = "Role should not be empty";
      }
    }
    if (Object.entries(errors).length === 0) {
      return null;
    } else {
      return errors;
    }
};

export const validateEmail = (emailAdd = "") => {
    let regEx =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailAdd.length) {
      return "Should not be empty";
    } else if (emailAdd.length > 350) {
      return "Sorry, this email address is too long. Please try a shorter email";
    } else if (!emailAdd.match(regEx)) {
      return "Invalid email address";
    } else {
      return null;
    }
  };