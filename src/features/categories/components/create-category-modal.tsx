"use client";
import ResponsiveModal from "@/components/responsive-modal";
import { useCreateCategoryModal } from "../hooks/use-create-category-modal";
import { CreateCategoryForm } from "./create-category-form";

const CreateCategoryModal = () => {
  const { isOpen, setIsOpen, close } = useCreateCategoryModal();
  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateCategoryForm onCancel={close} />
    </ResponsiveModal>
  );
};

export default CreateCategoryModal;
