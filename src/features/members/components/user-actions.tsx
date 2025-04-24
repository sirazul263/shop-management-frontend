import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfirm } from "@/hooks/use-confirm";
import {
  ChartNoAxesColumnDecreasingIcon,
  PencilIcon,
  TrashIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { User } from "../types";

interface UserActionsProps {
  data: User;
  children: React.ReactNode;
}
export const UserActions = ({ data, children }: UserActionsProps) => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Delete Product",
    "This action can not be undone",
    "destructive"
  );

  const onDelete = async () => {
    const ok = await confirm();
    if (!ok) {
      return;
    }
    // mutate({
    //   storeId,
    //   productId: data.id,
    // });
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
            Update User
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-amber-500 focus:text-amber-700 font-medium p-[10px]"
            onClick={onDelete}
            // disabled={isPending}
          >
            <TrashIcon className="size-4 mr-2 stroke-2" />
            Deactivate User
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-green focus:text-amber-700 font-medium p-[10px]"
            onClick={onDelete}
            // disabled={isPending}
          >
            <ChartNoAxesColumnDecreasingIcon className="size-4 mr-2 stroke-2" />
            Assign Shop
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
