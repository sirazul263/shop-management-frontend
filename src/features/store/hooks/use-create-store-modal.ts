import { parseAsBoolean, useQueryState } from "nuqs";
export const useCreateStoreModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "create-store",
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
