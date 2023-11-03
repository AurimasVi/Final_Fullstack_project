export const Button = ({ buttonText, type, onClick }) => {
  return (
    <button type={type} onClick={onClick}>
      {buttonText}
    </button>
  );
};
