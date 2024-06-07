import { Button } from "../Button/Button";

export const ModalContent = ({
  onCancel,
  onConfirm,
  children,
  acceptBtnClass,
  cancelBtnClass,
  modalBtnWrapperClass,
}) => {
  return (
    <div>
      {children}
      <div className={modalBtnWrapperClass}>
        <Button
          onClick={onConfirm}
          buttonText="Patvirtinti"
          className={acceptBtnClass}
        />
        <Button
          onClick={onCancel}
          buttonText="Atšaukti"
          className={cancelBtnClass}
        />
      </div>
    </div>
  );
};
