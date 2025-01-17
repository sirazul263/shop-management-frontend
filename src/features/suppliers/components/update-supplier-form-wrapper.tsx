import { Supplier } from "../types";
import { UpdateSupplierForm } from "./update-supplier-form";

interface UpdateSupplierFormWrapperProps {
  onClose: () => void;
  data: Supplier;
}

export const UpdateSupplierFormWrapper = ({
  onClose,
  data,
}: UpdateSupplierFormWrapperProps) => {
  return (
    <div>
      <UpdateSupplierForm onClose={onClose} initialValues={data} />
    </div>
  );
};
