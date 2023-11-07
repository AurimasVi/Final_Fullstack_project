import { Button } from "../Button/Button";

export const ModalContent = ({ onCancel, onConfirm }) => {
  return (
    <div>
      <p>Ar tikrai norite ištrinti šį kliento vizitą?</p>
      <Button onClick={onConfirm} buttonText="Patvirtinti" />
      <Button onClick={onCancel} buttonText="Atšaukti" />
    </div>
  );
};
