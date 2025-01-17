"use client";
import ResponsiveModal from "@/components/responsive-modal";
import { Supplier } from "../types";
import { UpdateSupplierFormWrapper } from "./update-supplier-form-wrapper";
interface UpdateSupplierModalProps {
  data: Supplier;
  showUpdate: boolean;
  setShowUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateSupplierModal = ({
  data,
  showUpdate,
  setShowUpdate,
}: UpdateSupplierModalProps) => {
  const close = () => {
    setShowUpdate(false);
  };
  return (
    <ResponsiveModal open={showUpdate} onOpenChange={close}>
      <UpdateSupplierFormWrapper onClose={close} data={data} />
    </ResponsiveModal>
  );
};

export default UpdateSupplierModal;
