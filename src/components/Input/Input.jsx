export const Input = ({
  type,
  inputName,
  placeHolder,
  className,
  onChange,
}) => {
  return (
    <input
      type={type}
      name={inputName}
      placeholder={placeHolder}
      className={className}
      onChange={onChange}
      autoComplete="true"
    ></input>
  );
};
