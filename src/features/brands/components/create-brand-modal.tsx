"use client";
import ResponsiveModal from "@/components/responsive-modal";
import { useCreateBrandModal } from "../hooks/use-create-brand-modal";
import { CreateBrandForm } from "./create-brand-form";

const CreateBrandModal = () => {
  const { isOpen, setIsOpen, close } = useCreateBrandModal();
  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateBrandForm onCancel={close} />
    </ResponsiveModal>
  );
};

export default CreateBrandModal;
