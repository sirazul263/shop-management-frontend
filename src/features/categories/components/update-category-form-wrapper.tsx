import { Category } from "../types";
import { UpdateCategoryForm } from "./update-category-form";

interface UpdateCategoryFormWrapperProps {
  onClose: () => void;
  data: Category;
}

export const UpdateCategoryFormWrapper = ({
  onClose,
  data,
}: UpdateCategoryFormWrapperProps) => {
  return (
    <div>
      <UpdateCategoryForm onClose={onClose} initialValues={data} />
    </div>
  );
};
