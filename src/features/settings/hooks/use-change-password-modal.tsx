import { parseAsBoolean, useQueryState } from "nuqs";
export const useChangePasswordModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "change-password",
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
  );
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  return {
    isOpen,
    open,
    close,
    setIsOpen,
  };
};
