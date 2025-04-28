import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfirm } from "@/hooks/use-confirm";
import {
  PencilIcon,
  SchoolIcon,
  ShieldCheckIcon,
  ShieldXIcon,
} from "lucide-react";
import { User } from "../types";
import { useChangeUserStatus } from "../api/use-change-user-status";
import { useState } from "react";
import UpdateUserModal from "./update-user-modal";

interface UserActionsProps {
  data: User;
  children: React.ReactNode;
}
export const UserActions = ({ data, children }: UserActionsProps) => {
  const [ConfirmDialog, confirm] = useConfirm(
    `${data.status === "ACTIVE" ? "Deactivate" : "Activate"}  ${data.name}`,
    "This action can not be undone",
    "destructive"
  );

  const { mutate, isPending } = useChangeUserStatus();

  const updateStatus = async () => {
    const ok = await confirm();
    if (!ok) {
      return;
    }
    mutate({
      user_id: data.id,
      status: data.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
    });
  };

  //Update the brand
  const [showUpdate, setShowUpdate] = useState<boolean>(false);

  return (
    <div className="flex justify-end">
      <ConfirmDialog />
      {showUpdate && (
        <UpdateUserModal
          data={data}
          showUpdate={showUpdate}
          setShowUpdate={setShowUpdate}
        />
      )}
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            className="font-medium p-[10px]"
            onClick={() => setShowUpdate(true)}
            disabled={isPending}
          >
            <PencilIcon className="size-4 mr-2 stroke-2" />
            Update User
          </DropdownMenuItem>

          {data.status === "ACTIVE" ? (
            <DropdownMenuItem
              className="text-amber-500 focus:text-amber-700 font-medium p-[10px]"
              onClick={updateStatus}
              disabled={isPending}
            >
              <ShieldXIcon className="size-4 mr-2 stroke-2" />
              Deactivate User
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              className="text-green-600 focus:text-amber-700 font-medium p-[10px]"
              onClick={updateStatus}
              disabled={isPending}
            >
              <ShieldCheckIcon className="size-4 mr-2 stroke-2" />
              Activate User
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            className="text-green focus:text-amber-700 font-medium p-[10px]"
            // onClick={updateStatus}
            disabled={isPending}
          >
            <SchoolIcon className="size-4 mr-2 stroke-2" />
            Assign Shop
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
