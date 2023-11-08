export const Button = ({ buttonText, type, onClick, className }) => {
  return (
    <button type={type} onClick={onClick} className={className}>
      {buttonText}
    </button>
  );
};
