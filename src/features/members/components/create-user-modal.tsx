"use client";
import ResponsiveModal from "@/components/responsive-modal";
import { useCreateUserModal } from "../hooks/use-create-user-modal";
import { CreateUserForm } from "./create-user-form";

const CreateUserModal = () => {
  const { isOpen, setIsOpen, close } = useCreateUserModal();
  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateUserForm onCancel={close} />
    </ResponsiveModal>
  );
};

export default CreateUserModal;
