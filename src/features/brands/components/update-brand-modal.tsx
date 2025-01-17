"use client";
import ResponsiveModal from "@/components/responsive-modal";
import { Brand } from "../types";
import { UpdateBrandFormWrapper } from "./update-brand-form-wrapper";
interface UpdateBrandModalProps {
  data: Brand;
  showUpdate: boolean;
  setShowUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateBrandModal = ({
  data,
  showUpdate,
  setShowUpdate,
}: UpdateBrandModalProps) => {
  const close = () => {
    setShowUpdate(false);
  };
  return (
    <ResponsiveModal open={showUpdate} onOpenChange={close}>
      <UpdateBrandFormWrapper onClose={close} data={data} />
    </ResponsiveModal>
  );
};

export default UpdateBrandModal;
