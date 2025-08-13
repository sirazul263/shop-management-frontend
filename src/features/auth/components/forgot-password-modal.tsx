"use client";
import ResponsiveModal from "@/components/responsive-modal";
import { ForgotPasswordForm } from "./forgot-password-form";
interface ForgotPasswordModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const ForgotPasswordModal = ({ show, setShow }: ForgotPasswordModalProps) => {
  return (
    <ResponsiveModal open={show} onOpenChange={setShow}>
      <ForgotPasswordForm onCancel={() => setShow(false)} />
    </ResponsiveModal>
  );
};

export default ForgotPasswordModal;
