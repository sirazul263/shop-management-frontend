import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfirm } from "@/hooks/use-confirm";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { Category } from "../types";
import { useDeleteCategory } from "../api/use-delete-category";
import UpdateCategoryModal from "./update-category-modal";
import { useStoreId } from "@/hooks/use-store-id";

interface CategoryActionsProps {
  data: Category;
  children: React.ReactNode;
}
export const CategoryActions = ({ data, children }: CategoryActionsProps) => {
  const storeId = useStoreId();
  const [ConfirmDialog, confirm] = useConfirm(
    "Delete Category",
    "This action can not be undone",
    "destructive"
  );

  const { mutate, isPending } = useDeleteCategory();
  const onDelete = async () => {
    const ok = await confirm();
    if (!ok) {
      return;
    }
    mutate({
      storeId: storeId,
      categoryId: data.id,
    });
  };

  //Update the category
  const [showUpdate, setShowUpdate] = useState<boolean>(false);

  return (
    <div className="flex justify-end">
      <ConfirmDialog />
      {showUpdate && (
        <UpdateCategoryModal
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
            Update Category
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-amber-500 focus:text-amber-700 font-medium p-[10px]"
            onClick={onDelete}
            disabled={isPending}
          >
            <TrashIcon className="size-4 mr-2 stroke-2" />
            Delete Category
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
