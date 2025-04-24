"use client";
import ResponsiveModal from "@/components/responsive-modal";
import { useChangePasswordModal } from "../hooks/use-change-password-modal";
import { ChangePasswordForm } from "./change-password-form";

const ChangePasswordModal = () => {
  const { isOpen, setIsOpen, close } = useChangePasswordModal();
  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <ChangePasswordForm onCancel={close} />
    </ResponsiveModal>
  );
};

export default ChangePasswordModal;
