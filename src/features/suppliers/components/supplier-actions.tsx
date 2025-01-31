import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfirm } from "@/hooks/use-confirm";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { Supplier } from "../types";
import { useDeleteSupplier } from "../api/use-delete-supplier";
import UpdateSupplierModal from "./update-supplier-modal";
import { useStoreId } from "@/hooks/use-store-id";

interface SupplierActionsProps {
  data: Supplier;
  children: React.ReactNode;
}
export const SupplierActions = ({ data, children }: SupplierActionsProps) => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Delete Supplier",
    "This action can not be undone",
    "destructive"
  );
  const storeId = useStoreId();
  const { mutate, isPending } = useDeleteSupplier();
  const onDelete = async () => {
    const ok = await confirm();
    if (!ok) {
      return;
    }
    mutate({
      storeId,
      supplierId: data.id,
    });
  };

  //Update the supplier
  const [showUpdate, setShowUpdate] = useState<boolean>(false);

  return (
    <div className="flex justify-end">
      <ConfirmDialog />
      {showUpdate && (
        <UpdateSupplierModal
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
          >
            <PencilIcon className="size-4 mr-2 stroke-2" />
            Update Supplier
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-amber-500 focus:text-amber-700 font-medium p-[10px]"
            onClick={onDelete}
            disabled={isPending}
          >
            <TrashIcon className="size-4 mr-2 stroke-2" />
            Delete Supplier
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
