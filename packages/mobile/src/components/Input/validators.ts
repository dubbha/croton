const validatorEmail = (email: string): boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validatorPassword = (password: string): boolean => {
  return password.length > 7;
};

const validatorRepeatPassword = (
  password: string,
  repeatPassword: string,
): boolean => {
  return repeatPassword.length > 7 && password === repeatPassword;
};

const validatorName = (name: string): boolean => {
  return name.length > 2;
};

// TODO: make real code validation
const validatorCode = (code: string): boolean => {
  return code.length > 2;
};

const validatorLength = (value: string): boolean => {
  return value.length > 3;
};

export {
  validatorEmail,
  validatorPassword,
  validatorRepeatPassword,
  validatorName,
  validatorCode,
  validatorLength,
};
