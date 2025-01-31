import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfirm } from "@/hooks/use-confirm";
import { PencilIcon, TrashIcon } from "lucide-react";
import { Product } from "../types";
import { useDeleteProduct } from "../api/use-delete-product";
import { useRouter } from "next/navigation";
import { useStoreId } from "@/hooks/use-store-id";

interface ProductActionsProps {
  data: Product;
  children: React.ReactNode;
}
export const ProductActions = ({ data, children }: ProductActionsProps) => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Delete Product",
    "This action can not be undone",
    "destructive"
  );
  const storeId = useStoreId();
  const { mutate, isPending } = useDeleteProduct();
  const onDelete = async () => {
    const ok = await confirm();
    if (!ok) {
      return;
    }
    mutate({
      storeId,
      productId: data.id,
    });
  };

  const router = useRouter();

  return (
    <div className="flex justify-end">
      <ConfirmDialog />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            className="font-medium p-[10px]"
            onClick={() => router.push(`products/${data.id}`)}
          >
            <PencilIcon className="size-4 mr-2 stroke-2" />
            Update Product
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-amber-500 focus:text-amber-700 font-medium p-[10px]"
            onClick={onDelete}
            disabled={isPending}
          >
            <TrashIcon className="size-4 mr-2 stroke-2" />
            Delete Product
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
