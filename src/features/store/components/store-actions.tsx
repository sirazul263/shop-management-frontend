import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfirm } from "@/hooks/use-confirm";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { Store } from "../types";
import { useDeleteStore } from "../api/use-delete-store";
import UpdateStoreModal from "./update-store-modal";

interface StoreActionsProps {
  data: Store;
  children: React.ReactNode;
}
export const StoreActions = ({ data, children }: StoreActionsProps) => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Delete Store",
    "This action can not be undone",
    "destructive"
  );

  const { mutate, isPending } = useDeleteStore();
  const onDelete = async () => {
    const ok = await confirm();
    if (!ok) {
      return;
    }
    mutate({
      storeId: data.id,
    });
  };

  //Update the brand
  const [showUpdate, setShowUpdate] = useState<boolean>(false);

  return (
    <div className="flex justify-end">
      <ConfirmDialog />
      {showUpdate && (
        <UpdateStoreModal
          data={data}
          show={showUpdate}
          setShow={setShowUpdate}
        />
      )}
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            className="font-medium p-[10px]"
            onClick={() => setShowUpdate(true)}
          >
            <PencilIcon className="size-4 mr-2 stroke-2" />
            Update Store
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-amber-500 focus:text-amber-700 font-medium p-[10px]"
            onClick={onDelete}
            disabled={isPending}
          >
            <TrashIcon className="size-4 mr-2 stroke-2" />
            Delete Store
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
