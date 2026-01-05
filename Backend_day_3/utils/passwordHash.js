import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

export const verifyPassword = async (password, userPassword) => {
  const verify = await bcrypt.compare(password, userPassword);
  return verify;
};
