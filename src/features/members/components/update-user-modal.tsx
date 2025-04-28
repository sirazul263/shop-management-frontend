"use client";
import ResponsiveModal from "@/components/responsive-modal";
import { User } from "../types";
import { UpdateUserFormWrapper } from "./update-user-form-wrapper";
interface UpdateBrandModalProps {
  data: User;
  showUpdate: boolean;
  setShowUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateUserModal = ({
  data,
  showUpdate,
  setShowUpdate,
}: UpdateBrandModalProps) => {
  const close = () => {
    setShowUpdate(false);
  };
  return (
    <ResponsiveModal open={showUpdate} onOpenChange={close}>
      <UpdateUserFormWrapper onClose={close} data={data} />
    </ResponsiveModal>
  );
};

export default UpdateUserModal;
