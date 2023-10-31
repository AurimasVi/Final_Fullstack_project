import { Input } from "../Input/Input";

export const Form = () => {
  return (
    <form action="">
      <Input type="text" inputName="firstName" placeHolder="Vardas" />
      <Input type="text" inputName="lastName" placeHolder="Pavardė" />
      <Input type="email" inputName="email" placeHolder="El. Paštas" />
      <Input type="password" inputName="password" placeHolder="Slaptažodis" />
    </form>
  );
};
