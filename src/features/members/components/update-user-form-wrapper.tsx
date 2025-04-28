import { User } from "../types";
import { UpdateUserForm } from "./update-user-form";

interface UpdateUserFormWrapperProps {
  onClose: () => void;
  data: User;
}

export const UpdateUserFormWrapper = ({
  onClose,
  data,
}: UpdateUserFormWrapperProps) => {
  return (
    <div>
      <UpdateUserForm onClose={onClose} initialValues={data} />
    </div>
  );
};
