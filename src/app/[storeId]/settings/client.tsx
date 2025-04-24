"use client";

import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getCurrent } from "@/features/auth/queries";
import { useChangePasswordModal } from "@/features/settings/hooks/use-change-password-modal";
import { useStoreId } from "@/hooks/use-store-id";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const SettingsClient = () => {
  const [isClient, setIsClient] = useState(false);
  const user = isClient ? getCurrent() : null;
  const { open } = useChangePasswordModal();
  const storeId = useStoreId();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) return null;
  if (!user) return null;

  const { name, email, role } = user;

  return (
    <div>
      <div className="flex flex-col gap-y-4">
        {/* <DeleteDialog />
        <ResetDialog /> */}

        <Card className="w-full h-full  border-none shadow-none">
          <CardHeader className="flex flex-row  items-center gap-x-4 p-7 space-y-0">
            <Button
              size="sm"
              type="button"
              variant="secondary"
              onClick={() => router.push(`/${storeId}`)}
            >
              <ArrowLeftIcon className="size-4 mr-2" />
              Back
            </Button>
            <CardTitle className="text-xl font-bold">{name}</CardTitle>
          </CardHeader>
          <div className="px-7 ">
            <DottedSeparator />
          </div>
        </Card>
        <Card className="w-full h-full  border-none shadow-none">
          <CardContent className="p-7">
            <div className="flex flex-col ">
              <h3 className="font-bold">{name}</h3>
              <p className="text-sm text-muted-foreground">
                Manage your profile
              </p>
              <div className="mt-4">
                <div className="flex items-center gap-x-2">
                  <Input disabled value={name} />
                  <Input disabled value={email} />
                  <Input disabled value={role} />
                </div>
              </div>
              <DottedSeparator className="py-7" />
              <Button
                className="mt-6 w-fit ml-auto"
                size="sm"
                variant="destructive"
                type="button"
                onClick={open}
              >
                Change Password
              </Button>
            </div>
          </CardContent>
        </Card>
        {/* <Card className="w-full h-full  border-none shadow-none">
          <CardContent className="p-7">
            <div className="flex flex-col ">
              <h3 className="font-bold">Danger Zone</h3>
              <p className="text-sm text-muted-foreground">
                Deleting a workspace is irreversible and we will remove all
                associated data.
              </p>
              <DottedSeparator className="py-7" />
              <Button
                className="mt-6 w-fit ml-auto"
                size="sm"
                variant="destructive"
                type="button"
              >
                Delete Workspace
                <DeleteIcon className="ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
};
