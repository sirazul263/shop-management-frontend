import { Brand } from "../types";
import { UpdateBrandForm } from "./update-brand-form";

interface UpdateBrandFormWrapperProps {
  onClose: () => void;
  data: Brand;
}

export const UpdateBrandFormWrapper = ({
  onClose,
  data,
}: UpdateBrandFormWrapperProps) => {
  return (
    <div>
      <UpdateBrandForm onClose={onClose} initialValues={data} />
    </div>
  );
};
