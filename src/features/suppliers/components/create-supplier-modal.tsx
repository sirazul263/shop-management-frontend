"use client";
import ResponsiveModal from "@/components/responsive-modal";
import { useCreateSupplierModal } from "../hooks/use-create-supplier-modal";
import { CreateSupplierForm } from "./create-supplier-form";

const CreateSupplierModal = () => {
  const { isOpen, setIsOpen, close } = useCreateSupplierModal();
  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateSupplierForm onCancel={close} />
    </ResponsiveModal>
  );
};

export default CreateSupplierModal;
