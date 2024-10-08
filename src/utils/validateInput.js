export const validateInput = (email = "", password = "") => {
  const isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(
    password
  );
  if (!isEmailValid) return "Please enter a valid email";
  if (!isPasswordValid) return "Password is not valid";

  return null;
};
