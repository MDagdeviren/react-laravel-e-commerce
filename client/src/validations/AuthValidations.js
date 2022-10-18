import { object, string, number, date, InferType, ref } from "yup";

const login = object({
  email: string().email().required(),
  password: string().min(6).required(),
});

const AuthValidations = {
  login,
};
export default AuthValidations;
