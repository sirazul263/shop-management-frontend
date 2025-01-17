"use client";
import ResponsiveModal from "@/components/responsive-modal";
import { Category } from "../types";
import { UpdateCategoryFormWrapper } from "./update-category-form-wrapper";
interface UpdateCategoryModalProps {
  data: Category;
  showUpdate: boolean;
  setShowUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateCategoryModal = ({
  data,
  showUpdate,
  setShowUpdate,
}: UpdateCategoryModalProps) => {
  const close = () => {
    setShowUpdate(false);
  };
  return (
    <ResponsiveModal open={showUpdate} onOpenChange={close}>
      <UpdateCategoryFormWrapper onClose={close} data={data} />
    </ResponsiveModal>
  );
};

export default UpdateCategoryModal;
