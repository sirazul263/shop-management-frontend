"use client";
import ResponsiveModal from "@/components/responsive-modal";
import { useCreateStoreModal } from "../hooks/use-create-store-modal";
import { CreateStoreForm } from "./create-store-form";

const CreateStoreModal = () => {
  const { isOpen, setIsOpen, close } = useCreateStoreModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateStoreForm onCancel={close} />
    </ResponsiveModal>
  );
};

export default CreateStoreModal;
