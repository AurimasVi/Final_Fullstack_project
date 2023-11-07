import { Button } from "../Button/Button";

export const ModalContent = ({ onCancel, onConfirm, children }) => {
  return (
    <div>
      {children}
      <Button onClick={onConfirm} buttonText="Patvirtinti" />
      <Button onClick={onCancel} buttonText="Atšaukti" />
    </div>
  );
};
